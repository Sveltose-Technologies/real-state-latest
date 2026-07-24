"use client";
import React, { useEffect, useState } from "react";
import { BASE_URL } from '../api/axios';
import { aboutUs } from "../services/userService";

const About = () => {
  // Using global BASE_URL
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await aboutUs();
        if (response?.aboutUs && response.aboutUs.length > 0) {
          setAboutData(response.aboutUs[0]);
        }
      } catch (error) {
        console.error("Failed to fetch About Us data:", error);
      }
    };
    fetchAbout();
  }, []);

  return (
    <>
      <style>{`
        .about-hero {
          background: linear-gradient(135deg, #0c3547 0%, #1a9675 100%);
          color: white;
          padding: 100px 0;
          text-align: center;
        }
        .about-hero h1 {
          font-family: 'Georgia', serif;
          font-size: 3.8rem;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .about-hero p {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }
        .about-section {
          padding: 100px 0;
          background-color: #fafafa;
        }
        .about-img-wrapper {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .about-img-wrapper img {
          width: 100%;
          height: auto;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .about-img-wrapper:hover img {
          transform: scale(1.05);
        }
        .about-content {
          padding-left: 50px;
        }
        .about-title {
          font-family: 'Georgia', serif;
          font-size: 3rem;
          color: #111;
          margin-bottom: 30px;
          position: relative;
          padding-bottom: 15px;
          font-weight: 600;
        }
        .about-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 80px;
          height: 4px;
          background: #1a9675;
        }
        .about-description {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 30px;
        }
        .about-rich-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #444;
          background: #fff;
          padding: 30px;
          border-left: 5px solid #1a9675;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border-radius: 0 8px 8px 0;
        }
        
        @media (max-width: 991px) {
          .about-content {
            padding-left: 0;
            margin-top: 50px;
            text-align: center;
          }
          .about-title {
            font-size: 2.5rem;
          }
          .about-title::after {
            left: 50%;
            transform: translateX(-50%);
          }
          .about-rich-text {
            text-align: left;
            border-left: none;
            border-top: 5px solid #1a9675;
            border-radius: 0 0 8px 8px;
          }
        }
      `}</style>

      <section className="about-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Discover our story and how we help you find the perfect property.</p>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          {aboutData ? (
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="about-img-wrapper">
                  <img
                    src={aboutData.image?.startsWith('http') ? aboutData.image : `${BASE_URL}${aboutData.image}`}
                    alt={aboutData.title || "About Us"}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <h2 className="about-title">{aboutData.title}</h2>
                  {aboutData.description && (
                    <p className="about-description">{aboutData.description}</p>
                  )}
                  {aboutData.textEditor && (
                    <div 
                      className="about-rich-text"
                      dangerouslySetInnerHTML={{ __html: aboutData.textEditor }} 
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default About;
