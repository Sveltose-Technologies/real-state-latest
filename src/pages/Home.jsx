"use client";
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../api/axios';
import { Link } from 'react-router-dom';
import {
  fetchBanners,
  getBestExperienceBanner,
  getOurExpertiseApi,
  getTestimonial
} from '../services/userService';

function Home() {
  const [banners, setBanners] = useState([]);
  const [bestExp, setBestExp] = useState(null);
  const [expertise, setExpertise] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [banRes, expRes, servRes, testRes] = await Promise.all([
          fetchBanners(),
          getBestExperienceBanner(),
          getOurExpertiseApi(),
          getTestimonial()
        ]);

        if (banRes?.data && banRes.data.length) setBanners(banRes.data);
        else if (banRes && banRes.length) setBanners(banRes);

        if (expRes?.data && expRes.data.length) setBestExp(expRes.data[0]);
        else if (expRes && expRes.length) setBestExp(expRes[0]);

        if (servRes?.data && servRes.data.length) setExpertise(servRes.data);
        else if (servRes && servRes.length) setExpertise(servRes);

        if (testRes?.testimonials && testRes.testimonials.length) setTestimonials(testRes.testimonials);
        else if (testRes?.data && testRes.data.length) setTestimonials(testRes.data);
        else if (testRes && testRes.length) setTestimonials(testRes);
      } catch (err) {
        console.error("Error loading home data", err);
      }
    };
    loadData();
  }, []);

  // Carousel logic
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [banners]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  // Testimonial Carousel logic
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const handleTestimonialNext = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const handleTestimonialPrev = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Default fallback images
  const defaultBanner = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920";
  const defaultExpImg = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800";
  const defaultExpertiseImg = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200";

  let expImage = defaultExpImg;
  if (bestExp?.image && typeof bestExp.image === 'string') {
    expImage = `${BASE_URL}${bestExp.image}`;
  } else if (bestExp?.image?.[0]?.url) {
    expImage = bestExp.image[0].url;
  } else if (bestExp?.imageUrl) {
    expImage = bestExp.imageUrl;
  }

  // Extract expertise image and list depending on API shape
  const ourExpertiseData = Array.isArray(expertise) ? expertise[0] : expertise;
  const actualExpertiseList = ourExpertiseData?.expertise || expertise || [];

  let expertiseImage = defaultExpertiseImg;
  if (ourExpertiseData?.image && typeof ourExpertiseData.image === 'string') {
    expertiseImage = `${BASE_URL}${ourExpertiseData.image}`;
  } else if (ourExpertiseData?.image?.[0]?.url) {
    expertiseImage = ourExpertiseData.image[0].url;
  } else if (ourExpertiseData?.imageUrl) {
    expertiseImage = ourExpertiseData.imageUrl;
  }

  return (
    <div className="home-container">
      {/* 1. HERO BANNER SECTION */}
      <section className="hero-slider">
        {banners.length > 0 ? (
          banners.map((banner, idx) => {
            let imgUrl = defaultBanner;
            if (banner?.bannerImage?.[0]) {
              imgUrl = `${BASE_URL}${banner.bannerImage[0]}`;
            } else if (banner?.image?.[0]?.url) {
              imgUrl = banner.image[0].url;
            } else if (banner?.imageUrl) {
              imgUrl = banner.imageUrl;
            } else if (banner?.image) {
              imgUrl = banner.image;
            }

            return (
              <div
                key={banner._id || banner.id || idx}
                className={`slide ${idx === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${imgUrl})` }}
              >
                <div className="slide-overlay"></div>
                <div className="slide-content">
                  <p className="help-text">NEED ANY HELP?</p>
                  <h1>{banner.heading || banner.title || "Find a Home You'll Love"}</h1>
                  <Link to="/appraisal-request" className="cta-btn">
                    Request an appraisal
                  </Link>
                </div>
              </div>
            )
          })
        ) : (
          <div className="slide active" style={{ backgroundImage: `url(${defaultBanner})` }}>
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <p className="help-text">NEED ANY HELP?</p>
              <h1>Find a Home You'll Love on home</h1>
              <Link to="/appraisal-request" className="cta-btn">
                Request an appraisal
              </Link>
            </div>
          </div>
        )}

        {/* Slider Controls */}
        {banners.length > 1 && (
          <div className="slider-controls">
            <button onClick={handlePrev}>&lsaquo;</button>
            <button onClick={handleNext}>&rsaquo;</button>
          </div>
        )}
      </section>

      {/* 2. BEST EXPERIENCE SECTION */}
      <section className="best-experience">
        <div className="container exp-grid">
          <div className="exp-image">
            <img src={expImage} alt="Best Experience" />
          </div>
          <div className="exp-content">
            <span className="section-subtitle">Best Experience</span>
            <h2 className="section-title">
              {bestExp?.title || bestExp?.heading || "We Deliver Complete Real Estate Solutions To Buyers And Sellers."}
            </h2>
            <p className="section-desc">
              {bestExp?.description || "We guide you through every step of your property journey with confidence and clarity."}
            </p>

            <div className="stats-row">
              <div className="stat-item">
                <div className="circle-progress" style={{ "--val": "45%" }}>
                  <span className="inner-val">45%</span>
                </div>
                <p>Properties Listed</p>
              </div>
              <div className="stat-item">
                <div className="circle-progress" style={{ "--val": "55%" }}>
                  <span className="inner-val">55%</span>
                </div>
                <p>Deals Closed</p>
              </div>
              <div className="stat-item">
                <div className="circle-progress" style={{ "--val": "60%" }}>
                  <span className="inner-val">60%</span>
                </div>
                <p>Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR EXPERTISE SECTION */}
      <section className="our-expertise">
        <div className="container">
          <div className="expertise-header">
            <span className="section-subtitle">Our Expertise</span>
            <h2 className="section-title">{ourExpertiseData?.title || "This Is Our Expertise"}</h2>
          </div>

          <div className="expertise-grid">
            <div className="services-list">
              {actualExpertiseList && actualExpertiseList.length > 0 ? (
                actualExpertiseList.slice(0, 4).map((serv, idx) => (
                  <div className="service-card" key={serv.id || idx}>
                    <div className="serv-number">0{idx + 1}</div>
                    <div className="serv-icon">
                      {/* Using generic icons depending on idx for aesthetic match */}
                      {idx === 0 ? "📈" : idx === 1 ? "💼" : idx === 2 ? "💰" : "🛡️"}
                    </div>
                    <h4>{serv.title || serv.heading || serv.name || "Expert Service"}</h4>
                    <p>{serv.description || "Providing expert analysis and reliable property guidance."}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="service-card">
                    <div className="serv-number">01</div>
                    <div className="serv-icon">📈</div>
                    <h4>Residential Property</h4>
                    <p>We help clients buy, sell, and invest in residential properties with expert guidance.</p>
                  </div>
                  <div className="service-card">
                    <div className="serv-number">03</div>
                    <div className="serv-icon">💼</div>
                    <h4>Property Management</h4>
                    <p>Complete property management services including tenant management and maintenance.</p>
                  </div>
                  <div className="service-card">
                    <div className="serv-number">02</div>
                    <div className="serv-icon">💰</div>
                    <h4>Commercial Property</h4>
                    <p>Professional solutions for offices, retail spaces, warehouses, and commercial investments.</p>
                  </div>
                  <div className="service-card">
                    <div className="serv-number">04</div>
                    <div className="serv-icon">🛡️</div>
                    <h4>Property Valuation</h4>
                    <p>Accurate market valuation to help clients make informed real estate decisions.</p>
                  </div>
                </>
              )}
            </div>

            <div className="expertise-image">
              <img src={expertiseImage} alt="Our Expertise" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="testimonials">
        <div className="container">
          <div className="test-header text-center">
            <span className="section-subtitle">They Trusted Us</span>
            <h2 className="section-title">Testimonial</h2>
          </div>

          <div className="test-carousel">
            {testimonials && testimonials.length > 0 ? (
              testimonials.map((t, idx) => {
                let testImg = null;
                if (t?.image && typeof t.image === 'string') {
                  testImg = t.image.startsWith('http') ? t.image : `${BASE_URL}${t.image}`;
                } else if (t?.image?.[0]?.url) {
                  testImg = t.image[0].url;
                } else if (t?.imageUrl) {
                  testImg = t.imageUrl;
                }

                return (
                  <div className={`test-slide ${idx === currentTestimonial ? 'active' : ''}`} key={t._id || t.id || idx}>
                    <div className="test-card">
                      {testImg && (
                        <div className="test-img-container">
                          <img src={testImg} alt={t.name || t.clientName || "Client"} className="test-client-img" />
                        </div>
                      )}
                      {/* <div className="quote-mark">“</div> */}
                      <p className="test-text">{t.description || t.message}</p>
                      <div className="test-author">
                        <h5>{t.name || t.clientName || "Happy Client"}</h5>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="test-slide active">
                <div className="test-card">
                  <div className="quote-mark">“</div>
                  <p className="test-text">They sold our house in under a week and well over asking price! Their marketing strategy and negotiation skills are top-notch.</p>
                </div>
              </div>
            )}

            {/* Controls */}
            {testimonials && testimonials.length > 1 && (
              <div className="test-controls">
                <button onClick={handleTestimonialPrev}>&lsaquo;</button>
                <button onClick={handleTestimonialNext}>&rsaquo;</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
         /* Shared Globals */
         .container {
           max-width: 1700px;
           margin: 0 auto;
           padding: 0 20px;
         }
         .text-center { text-align: center; }
         .section-subtitle {
           display: inline-block;
           color: #1a9675; /* A bit greener/teal matching the screenshot */
           font-weight: 600;
           margin-bottom: 15px;
           font-size: 1.1rem;
           border-bottom: 2px solid #1a9675;
           padding-bottom: 4px;
         }
         .section-title {
           font-family: 'Georgia', serif;
           font-size: 2.8rem;
           color: #111;
           line-height: 1.25;
           margin-bottom: 25px;
           font-weight: 500;
         }
         .section-desc {
           color: #555;
           font-size: 1.05rem;
           line-height: 1.6;
           margin-bottom: 40px;
         }

         /* HERO SLIDER */
         .hero-slider {
           position: relative;
           height: 80vh;
           min-height: 600px;
           overflow: hidden;
           background-color: #0c3547;
         }
         .slide {
           position: absolute;
           top: 0; left: 0; width: 100%; height: 100%;
           background-size: cover;
           background-position: center;
           opacity: 0;
           transition: opacity 0.8s ease-in-out;
           z-index: 1;
         }
         .slide.active {
           opacity: 1;
           z-index: 2;
         }
         .slide-overlay {
           position: absolute;
           inset: 0;
           background: rgba(0, 0, 0, 0.2);
         }
         .slide-content {
           position: relative;
           z-index: 3;
           height: 100%;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           text-align: center;
           color: #fff;
           padding: 0 20px;
         }
         .help-text {
           font-size: 0.85rem;
           letter-spacing: 3px;
           text-transform: uppercase;
           margin-bottom: 20px;
           font-weight: 600;
         }
         .slide-content h1, .banner-text-editor {
           font-family: 'Georgia', serif;
           font-size: 3.5rem;
           font-weight: 500;
           margin-bottom: 40px;
           max-width: 900px;
           line-height: 1.1;
           text-shadow: 0 2px 10px rgba(0,0,0,0.3);
         }
         .banner-text-editor p {
           margin: 0;
         }
         .cta-btn {
           background: #fff;
           color: #111;
           padding: 16px 45px;
           border-radius: 50px;
           font-weight: 600;
           text-decoration: none;
           font-size: 1.05rem;
           transition: all 0.3s;
           box-shadow: 0 4px 15px rgba(0,0,0,0.1);
         }
         .cta-btn:hover {
           background: #f8f9fa;
           transform: translateY(-2px);
         }
         .slider-controls {
           position: absolute;
           bottom: 40px;
           left: 50%;
           transform: translateX(-50%);
           z-index: 4;
           display: flex;
           gap: 20px;
         }
         .slider-controls button {
           background: transparent;
           border: 1px solid rgba(255,255,255,0.7);
           color: #fff;
           border-radius: 50%;
           width: 40px;
           height: 40px;
           font-size: 1.5rem;
           cursor: pointer;
           display: flex;
           align-items: center;
           justify-content: center;
           transition: 0.3s;
         }
         .slider-controls button:hover {
           background: #fff;
           color: #333;
         }

         /* BEST EXPERIENCE */
         .best-experience {
           padding: 120px 0;
           background: #fff;
         }
         .exp-grid {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 60px;
           align-items: center;
         }
         .exp-image img {
           width: 100%;
           height: auto;
           object-fit: cover;
           border-radius: 8px;
         }
         .stats-row {
           display: flex;
           gap: 60px;
           margin-top: 50px;
         }
         .stat-item {
           text-align: center;
         }
         .circle-progress {
           width: 100px;
           height: 100px;
           border-radius: 50%;
           background: conic-gradient(#17a2b8 var(--val), #f0f0f0 0deg);
           display: flex;
           align-items: center;
           justify-content: center;
           margin: 0 auto 15px;
           position: relative;
         }
         .circle-progress::before {
           content: "";
           position: absolute;
           inset: 4px; /* Thickness of the ring */
           background: #fff;
           border-radius: 50%;
         }
         .inner-val {
           position: relative;
           z-index: 1;
           font-weight: 700;
           font-size: 1.3rem;
           color: #111;
         }
         .stat-item p {
           font-size: 0.95rem;
           color: #555;
           font-weight: 500;
         }

         /* OUR EXPERTISE */
         .our-expertise {
           padding: 100px 0;
           background: #fff;
         }
         .expertise-header {
           max-width: 650px;
           margin-bottom: 60px;
         }
         .expertise-grid {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 80px;
         }
         .services-list {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 30px;
         }
         .service-card {
           background: #fff;
           padding: 30px 20px;
           border-radius: 8px;
           border: 1px solid #f2f2f2;
           position: relative;
           transition: box-shadow 0.3s;
         }
         .service-card:hover {
           box-shadow: 0 10px 30px rgba(0,0,0,0.06);
           border-color: #fff;
         }
         .serv-number {
           position: absolute;
           top: 20px; right: 20px;
           font-size: 2.5rem;
           color: #e8e8e8;
           font-family: 'Georgia', serif;
           font-weight: bold;
         }
         .serv-icon {
           font-size: 2.2rem;
           margin-bottom: 20px;
           color: #d89f65; /* Beige/gold tone for icons */
         }
         .service-card h4 {
           font-size: 1.15rem;
           color: #111;
           margin-bottom: 12px;
           font-weight: 700;
           font-family: 'Georgia', serif;
         }
         .service-card p {
           color: #666;
           font-size: 0.95rem;
           line-height: 1.6;
           margin-bottom: 10px;
         }
         .expertise-image img {
           width: 100%;
           height: 100%;
           object-fit: cover;
           border-radius: 4px;
           max-height: 600px;
         }

         /* TESTIMONIALS */
         .testimonials {
           padding: 100px 0;
           background: #fafafa;
         }
         .test-header { margin-bottom: 60px; }
         .test-carousel {
           position: relative;
           max-width: 900px;
           margin: 0 auto;
           overflow: hidden;
         }
         .test-slide {
           position: absolute;
           top: 0; left: 0; width: 100%;
           opacity: 0;
           transform: translateX(50px) scale(0.95);
           transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
           pointer-events: none;
           visibility: hidden;
         }
         .test-slide.active {
           position: relative;
           opacity: 1;
           transform: translateX(0) scale(1);
           pointer-events: auto;
           z-index: 2;
           visibility: visible;
         }
         .test-controls {
           display: flex;
           justify-content: center;
           gap: 20px;
           margin-top: 40px;
         }
         .test-controls button {
           background: #fff;
           border: 1px solid #ddd;
           color: #333;
           border-radius: 50%;
           width: 50px;
           height: 50px;
           font-size: 1.8rem;
           cursor: pointer;
           display: flex;
           align-items: center;
           justify-content: center;
           transition: 0.3s;
           box-shadow: 0 4px 10px rgba(0,0,0,0.05);
         }
         .test-controls button:hover {
           background: #1a9675;
           color: #fff;
           border-color: #1a9675;
         }
         .test-card {
           background: #fff;
           padding: 40px;
           border-radius: 8px;
           text-align: center;
           box-shadow: 0 5px 20px rgba(0,0,0,0.03);
           border: 1px solid #f5f5f5;
         }
         .test-client-img {
           width: 80px;
           height: 80px;
           border-radius: 50%;
           object-fit: cover;
           margin: 0 auto 15px;
           border: 3px solid #f0f0f0;
         }
         .quote-mark {
           font-size: 5rem;
           font-family: 'Georgia', serif;
           color: #f0f0f0;
           line-height: 1;
           margin-bottom: -20px;
         }
         .test-text {
           font-style: italic;
           color: #555;
           line-height: 1.8;
           margin-bottom: 30px;
           font-size: 1.05rem;
         }
         .test-author h5 {
           font-size: 1.15rem;
           color: #111;
           margin: 0;
           font-weight: 600;
         }

         /* RESPONSIVE */
         @media(max-width: 1200px) {
           .expertise-grid { grid-template-columns: 1fr; }
           .expertise-image img { height: 400px; }
         }
         @media(max-width: 992px) {
           .exp-grid { grid-template-columns: 1fr; }
           .slide-content h1 { font-size: 3.5rem; }
         }
         @media(max-width: 768px) {
           .services-list { grid-template-columns: 1fr; }
           .stats-row { flex-wrap: wrap; }
           .slide-content h1 { font-size: 2.5rem; }
           .section-title { font-size: 2.2rem; }
         }
      `}</style>
    </div>
  );
}

export default Home;
