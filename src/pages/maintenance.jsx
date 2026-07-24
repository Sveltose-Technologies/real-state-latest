

"use client";
import React, { useEffect, useState } from "react";
import { BASE_URL } from '../api/axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { getMaintenanceBannerApi, getMaintenanceFirstSectionApi, getMaintenanceSecondSectionApi, getMaintenanceThirdSectionApi } from '../services/userService';

const MaintenancePage = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [firstSection, setFirstSection] = useState(null);
  const [secondSection, setSecondSection] = useState(null);
  const [thirdSection, setThirdSection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerRes, sectionRes, secondRes, thirdRes] = await Promise.all([
          getMaintenanceBannerApi(),
          getMaintenanceFirstSectionApi(),
          getMaintenanceSecondSectionApi(),
          getMaintenanceThirdSectionApi()
        ]);
        if (bannerRes?.data?.[0]?.bannerImages) {
          setBannerImages(bannerRes.data[0].bannerImages);
        }
        if (sectionRes?.data?.[0]) {
          setFirstSection(sectionRes.data[0]);
        }
        if (secondRes?.data?.[0]) {
          setSecondSection(secondRes.data[0]);
        }
        if (thirdRes?.data?.[0]) {
          setThirdSection(thirdRes.data[0]);
        }
      } catch (err) {
        console.error("Failed to load maintenance data", err);
      }
    };
    fetchData();

    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
      const carouselElement = document.getElementById("mainCarousel");
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 3000,
          ride: "carousel",
        });
      }
    });
  }, []);

  const themeGreen = "#78be20"; // Lime Green
  const darkGreen = "#052011"; // Dark Forest Green

  return (
    <>
      <style>
        {`
          .hero-img {
            height: 300px;
            object-fit: cover;
          }
          @media (min-width: 768px) {
            .hero-img {
              height: 550px;
            }
          }
          .benefit-circle {
            max-width: 250px;
            margin: 0 auto;
          }
          @media (min-width: 768px) {
            .benefit-circle {
              max-width: 100%;
            }
          }
          .service-list {
            list-style-type: disc;
            padding-left: 1.5rem;
          }
          .service-list li {
            margin-bottom: 0.75rem;
            color: #444;
          }
          .rich-text-content {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #444;
          }
          .rich-text-content p {
            margin-bottom: 1rem;
          }
          .rich-text-content strong {
            color: #052011;
          }
          @media (max-width: 768px) {
            .rich-text-content {
              font-size: 1rem;
            }
          }
        `}
      </style>
      <div
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#444",
        }}>
        {/* 3. HD HERO SLIDER */}
        <div
          id="mainCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel">
          <div className="carousel-inner">
            {bannerImages.length > 0 ? (
              bannerImages.map((img, idx) => (
                <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
                  <img
                    src={img.startsWith('http') ? img : `${BASE_URL}${img}`}
                    className="d-block w-100 hero-img"
                    alt={`Maintenance Banner ${idx + 1}`}
                  />
                </div>
              ))
            ) : (
              <>
                <div className="carousel-item active">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=100"
                    className="d-block w-100 hero-img"
                    alt="Clean Kitchen Maintenance"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=100"
                    className="d-block w-100 hero-img"
                    alt="Interior Painting"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=100"
                    className="d-block w-100 hero-img"
                    alt="Modern Interior"
                  />
                </div>
              </>
            )}
          </div>
          {bannerImages.length !== 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide="prev">
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide="next">
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"></span>
              </button>
            </>
          )}
        </div>

        {/* 4. INTRO SECTION */}
        <div className="container py-4 py-md-5">
          <div className="row align-items-center g-4 g-md-5">
            <div className="col-md-5">
              <img
                src={secondSection?.image ? (secondSection.image.startsWith('http') ? secondSection.image : `${BASE_URL}${secondSection.image}`) : "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=100"}
                alt={secondSection?.title || "Tools and Maintenance"}
                className="img-fluid rounded shadow-sm"
              />
            </div>
            <div className="col-md-7">
              {secondSection?.title && (
                <h2 className="mb-4 fw-bold" style={{ color: darkGreen }}>{secondSection.title}</h2>
              )}
              {secondSection?.textEditor && secondSection.textEditor !== '<p></p>' ? (
                <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: secondSection.textEditor }} />
              ) : secondSection?.description ? (
                secondSection.description.split('\n').map((line, idx) => (
                  line.trim() ? <p key={idx} className={idx === 0 ? "lead text-dark" : ""}>{line}</p> : null
                ))
              ) : (
                <p>No content available.</p>
              )}
            </div>
          </div>
        </div>

        {/* 5. BENEFITS SECTION */}
        <div className="container py-4 py-md-5 border-top">
          <div className="row align-items-center g-4 g-md-5">
            <div className="col-md-8">
              <h3 className="fw-bold mb-4" style={{ color: darkGreen }}>
                {thirdSection?.title || "Benefits of Our Home Maintenance Services:"}
              </h3>
              {thirdSection?.textEditor && thirdSection.textEditor !== '<p></p>' ? (
                <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: thirdSection.textEditor }} />
              ) : thirdSection?.description ? (
                <div className="rich-text-content">
                  {thirdSection.description.split('\n').map((line, idx) => (
                    line.trim() ? <p key={idx}>{line}</p> : null
                  ))}
                </div>
              ) : (
                <p>No benefits listed.</p>
              )}
            </div>
            <div className="col-md-4 text-center mt-4 mt-md-0">
              <img
                src={thirdSection?.image ? (thirdSection.image.startsWith('http') ? thirdSection.image : `${BASE_URL}${thirdSection.image}`) : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=100"}
                alt={thirdSection?.title || "Professional Real Estate"}
                className="img-fluid rounded-circle shadow benefit-circle"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintenancePage;