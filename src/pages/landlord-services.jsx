import React, { useEffect } from "react";
import { BASE_URL } from '../api/axios';
import "bootstrap/dist/css/bootstrap.min.css";
// Note: Make sure to include Bootstrap Icons in your index.html or via npm if you want the icons to render.
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
import { useFetch } from "../hooks/useFetch";
import {
  getPropertyManagementBannerApi,
  getPropertyManagementContentApi,
  getPropertyManagementServicesApi,
} from "../services/userService";


const LandlordServices = () => {
  const { data: bannerData, fetchData: fetchBanner } = useFetch(getPropertyManagementBannerApi);
  const { data: contentData, fetchData: fetchContent } = useFetch(getPropertyManagementContentApi);
  const { data: servicesData, fetchData: fetchServices } = useFetch(getPropertyManagementServicesApi);

  useEffect(() => {
    fetchBanner();
    fetchContent();
    fetchServices();
  }, [fetchBanner, fetchContent, fetchServices]);

  const banner = bannerData && bannerData.length > 0 ? bannerData[0] : null;
  const content = contentData && contentData.length > 0 ? contentData[0] : null;
  // Brand Colors
  const colors = {
    darkBg: "#293440", // Dark slate/blue background
    gold: "#0e5c35", // Gold button and accent text
    lightBg: "#F8F9FA",
    textMuted: "#6c757d",
  };

  const approachFeatures = [
    {
      icon: "bi-people-fill",
      title: "Expert Tenant Selection",
      desc: "Our comprehensive marketing and rigorous screening process ensures we place reliable and responsible tenants in your property.",
    },
    {
      icon: "bi-scales",
      title: "Optimising Your Rental Return",
      desc: "We conduct a thorough rental appraisal based on current market demand and property condition to ensure you're getting the best long term return.",
    },
    {
      icon: "bi-shield-check",
      title: "Confident with Compliance",
      desc: "We manage all legal and compliance work, including tenancy agreements and bond lodgements, and ensure your property meets all Healthy Homes Standards.",
    },
    {
      icon: "bi-house-gear-fill",
      title: "Maintaining Your Property's Value",
      desc: "We believe in proactive maintenance, coordinating all repairs with our network of trusted local tradespeople to ensure quality work at competitive prices.",
    },
    {
      icon: "bi-search",
      title: "Detailed Inspections",
      desc: "You'll receive a detailed report with photos after each inspection, keeping you fully informed about the condition of your property.",
    },
    {
      icon: "bi-bar-chart-line-fill",
      title: "Clear Financial Oversight",
      desc: "Receive detailed monthly and annual financial statements, providing a clear account of all income and expenditure related to your property.",
    },
  ];

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* 1. HERO SECTION */}
      <section
        style={{ backgroundColor: colors.darkBg, color: "#fff" }}
        className="py-5"
      >
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 pe-lg-5">
              <h1 className="display-4 fw-bold mb-4">
                {banner ? banner.title : "Property Management Services"}
              </h1>
              <p className="lh-lg mb-5" style={{ fontSize: "1.1rem" }}>
                {banner ? (banner.description || banner.textEditor) :
                  "Owning a rental property should be a rewarding experience, not a source of stress. At Tauranga Property Managers, we provide a full suite of property management services designed to protect your investment, secure high-quality tenants, and ensure you receive a consistent, healthy return. Let our local expertise work for you."}
              </p>
              <button
                className="btn border-0 px-4 py-2 fw-bold"
                style={{
                  backgroundColor: colors.gold,
                  color: "#fff",
                  borderRadius: "6px",
                }}
              >
                CONTACT US
              </button>
            </div>
            <div className="col-lg-6">
              {/* Replace with your actual image path */}
              <img
                src={`${BASE_URL}${banner?.image}` || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ8mPHxhf2neDG56rrjL5qeLQ-vjuusVwtKhfPti7kw&s=10"}
                alt="Aerial view of neighborhood"
                className="img-fluid rounded shadow-lg"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  maxHeight: "400px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRICING & SERVICES SECTION */}
      <section className="py-5" style={{ backgroundColor: "#fff" }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            {/* Left Card */}
            <div className="col-lg-5">
              <div
                className="p-5 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between"
                style={{
                  backgroundColor: colors.darkBg,
                  color: "#fff",
                  minHeight: "350px",
                }}
              >
                <h2 className="fs-3 lh-base mb-5">
                  {content ? content.title : "End-to-end service with a simple fee structure."}
                </h2>
                <div>
                  {/* Placeholder for Logo */}
                  <div className="d-flex align-items-center">
                    {content?.image ? (
                      <img
                        src={`${BASE_URL}${content.image}`}
                        alt="Logo"
                        style={{
                          width: "100%",
                          // height: "100px",
                          objectFit: "contain",
                        }}
                        className="me-3"
                      />
                    ) : (
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: colors.gold,
                          maskImage: "url('/assets/bars-icon.svg')",
                          WebkitMaskImage: "url('/assets/bars-icon.svg')",
                        }}
                        className="me-3"
                      ></div>
                    )}
                    <div
                      style={{
                        color: colors.gold,
                        lineHeight: "1.2",
                        letterSpacing: "1px",
                      }}
                    >
                      {/* Optionally add text here if needed */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-lg-7 ps-lg-5">
              <p
                className="mb-4 text-secondary"
                style={{ fontSize: "1.05rem" }}
              >
                {content ? content.description :
                  "We provide a complete management service to give you peace of mind. We handle every detail, from marketing your property and securing the perfect tenants, to managing maintenance and ensuring ongoing legal compliance."}
              </p>

              {content?.textEditor ? (
                <div
                  className="text-secondary mb-4 ps-3"
                  style={{ lineHeight: "1.8" }}
                  dangerouslySetInnerHTML={{ __html: content.textEditor }}
                />
              ) : (
                <>
                  <h4 className="fw-bold fs-5 mb-3 text-dark">
                    Transparent Pricing
                  </h4>
                  <ul
                    className="text-secondary mb-4 ps-3"
                    style={{ lineHeight: "1.8" }}
                  >
                    <li className="mb-2">
                      <strong className="text-dark">Simple Fees:</strong> Our
                      straightforward structure covers all our core services.
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark">No Surprise Charges:</strong> We
                      don't charge extra for tenant placement, routine inspections,
                      or coordinating maintenance.
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark">Predictable Investment:</strong>{" "}
                      You can accurately forecast your expenses and returns, giving
                      you financial clarity.
                    </li>
                  </ul>
                </>
              )}

              <p className="text-secondary small">
                For a simple breakdown of our all-inclusive pricing, we invite
                you to{" "}
                <a
                  href="#"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  view our Property Management Fees page.
                </a>
              </p>
            </div>
          </div>
        </div>
      </section >

      {/* 3. OUR COMPLETE APPROACH SECTION */}
      < section
        style={{ backgroundColor: colors.darkBg, color: "#fff" }}
        className="py-5"
      >
        <div className="container py-5 text-center">
          <div className="mb-5">
            <span
              className="fw-semibold d-block mb-2"
              style={{ color: colors.gold, fontSize: "1.2rem" }}
            >
              Our Complete Approach To
            </span>
            <h2 className="display-5 fw-bold">Property Management Services</h2>
          </div>

          <div className="row g-5 mt-4 text-center">
            {(servicesData && servicesData.length > 0 ? servicesData : approachFeatures).map((feature, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="p-3">
                  {feature.icon && (
                    <i
                      className={`bi ${feature.icon} mb-3 d-block`}
                      style={{ fontSize: "2.5rem", color: colors.gold }}
                    ></i>
                  )}
                  {feature.image && !feature.icon && (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      style={{ width: "60px", height: "60px", objectFit: "contain" }}
                      className="mb-3 d-block mx-auto"
                    />
                  )}
                  <h4 className="fw-bold mb-3 fs-5">{feature.title}</h4>
                  <p
                    style={{ color: "#d1d5db", fontSize: "0.95rem" }}
                    className="lh-base"
                  >
                    {feature.description || feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4">
            <button
              className="btn border-0 px-5 py-3 fw-bold text-uppercase"
              style={{
                backgroundColor: colors.gold,
                color: "#fff",
                borderRadius: "6px",
                letterSpacing: "0.5px",
              }}
            >
              Get Your Free Rent Appraisal
            </button>
          </div>
        </div>
      </section >
    </div >
  );
};

export default LandlordServices;
