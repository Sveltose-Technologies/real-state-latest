import React, { useEffect, useState } from "react";
import { BASE_URL } from '../api/axios';
import { useFetch } from "../hooks/useFetch";
import { getAreaWeCoverBannerApi, getAreaWeCoverContentApi, getAreaWeCoverMap } from "../services/userService";

export default function AreasWeCover() {
  
  const { data: bannerData, fetchData: fetchBannerData } = useFetch(getAreaWeCoverBannerApi);
  const { data: mapData, fetchData: fetchMapData } = useFetch(getAreaWeCoverMap);
  const { data: contentData, fetchData: fetchContentData } = useFetch(getAreaWeCoverContentApi);
  console.log("mapData", mapData);
  console.log("contentData", contentData);

  useEffect(() => {
    fetchBannerData();
    fetchMapData();
    fetchContentData();
  }, [fetchBannerData, fetchMapData, fetchContentData])
  const banner = bannerData && bannerData.length > 0 ? bannerData[0] : {
    title: "AREAS WE COVER",
    subTitle: "Proudly Managing Properties Across Tauranga & The Bay of Plenty",
    description: "As a locally owned and operated family business, our roots run deep in the Tauranga community. We provide our comprehensive, flat-fee property management services to landlords across the entire region. From the bustling city centre to the peaceful coastal and rural suburbs, we have the local knowledge to protect and grow your investment. Find your suburb below to learn more.",
    images: []
  };
  const content = contentData && contentData.length > 0 ? contentData[0] : null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (banner?.images && banner.images.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banner.images.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [banner?.images]);
  // Array of suburbs based on the image
  const suburbs = [
    "Tauranga",
    "Papamoa",
    "Mount Maunganui",
    "Avenues",
    "Pyes Pa",
    "Greerton",
    "Omokoroa",
    "Te Puke",
    "Otumoetai",
    "Bellevue",
    "Brookfield",
    "The Lakes",
    "Welcome Bay",
    "Ohauiti",
    "Bethlehem",
    "Tauriko",
    "Tauranga South",
    "Matua",
    "Gate Pa",
    "Judea",
    "Te Puna",
  ];

  return (
    <div className="w-100 font-sans">
      {/* =========================================
          TOP & MIDDLE SECTIONS (DARK BACKGROUND)
          ========================================= */}
      <div style={{ backgroundColor: "#2b3543", color: "white" }}>
        {/* 1. Top Hero Section */}
        <section className="container py-4 py-lg-5">
          <div className="row g-4 g-lg-5 align-items-center mt-3">
            {/* Left Content */}
            <div className="col-12 col-lg-6 pe-lg-5">
              <h1 className="display-4 mb-4" style={{ fontFamily: "Georgia, serif", fontSize: "40px" }}>{banner?.title}</h1>
              <h3 className="h4 fw-normal mb-4 text-white-50 lh-base">
                {banner?.subTitle}
              </h3>
              <p className="text-white-50 mb-5 lh-lg fs-6">
                {banner?.description}
              </p>
              <button
                className="btn text-white fw-bold px-4 py-2 rounded-2"
                style={{ backgroundColor: "#0e5c35" }}
              >
                CONTACT US
              </button>
            </div>

            {/* Right Content (Image / Multiple Images) */}
            <div className="col-12 col-lg-6">
              {/* Note: If you want a slider for multiple images, you can replace this with a Bootstrap Carousel or Swiper.js */}
              <img
                src={banner?.images && banner.images.length > 0 ? `${BASE_URL}${banner.images[currentImageIndex]}` : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=100"}
                alt={banner?.title || "House exterior with porch"}
                className="img-fluid rounded-4 shadow-lg w-100"
                style={{ objectFit: "cover", maxHeight: "450px", transition: "opacity 0.3s ease-in-out" }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* =========================================
          MIDDLE MAP SECTION (WHITE BACKGROUND)
          ========================================= */}
      <div className="bg-white text-dark">
        {/* 2. Middle Map Section */}
        <section className="container py-4 py-lg-5 my-3">
          <div className="row g-4 g-lg-5 align-items-center">
            {/* Left Content (Google Map) */}
            <div className="col-12 col-lg-6 mb-4 mb-lg-0">
              {mapData.map((item, index) => (

                <div
                  key={index}
                  className="rounded-4 overflow-hidden shadow-lg w-100"
                  style={{ height: "400px" }}
                >
                  {/* Embedded Google Map iframe - Replace src with your specific embedded map link */}
                  {/* Embedded Google Map iframe - Centered on Auckland, NZ */}
                  <iframe
                    src={`${item?.mapLink}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Auckland Service Area Map"
                  ></iframe>
                </div>
              ))}
            </div>

            {/* Right Content (Suburbs List) */}
            <div className="col-12 col-lg-6 ps-lg-5 d-flex align-items-center justify-content-center justify-content-lg-start mt-4 mt-lg-0">
              {mapData.map((item, index) => (
                <div key={index} className="d-flex flex-column text-center text-lg-start">
                  {/* Logo / Branding Text */}
                  <h2
                    className="mb-0 text-uppercase fw-semibold"
                    style={{
                      color: "#0e5c35",
                      letterSpacing: "2px",
                      lineHeight: "1.4",
                      fontFamily: "Georgia, serif"
                    }}
                  >
                    {item?.title}
                  </h2>
                  <div className="mt-3 fs-5 text-secondary">{item?.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* =========================================
          BOTTOM SECTION (WHITE BACKGROUND)
          ========================================= */}
      <div className="bg-white">
        {contentData?.map((item, index) => (
          <section key={index} className="container py-4 py-lg-5 my-4 my-lg-5">
            <div className="row g-4 g-lg-5 align-items-center">    {/* Right Content (Information Text) */}
              <div className="col-12 col-lg-7 ps-lg-5 text-dark">
                <p className="mb-4 lh-lg text-muted">
                  {item.description}
                </p>



              </div>
              {/* Left Content (Image replaced the text block per instructions) */}

              <div className="col-12 col-lg-5 mb-4 mb-lg-0">
                <img
                  src={item.image ? `${BASE_URL}${item.image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsoVNEFqogahwY8-1CuvxkjyOua4xPjHXCyIDxQuDbA&s=10"}
                  alt="Your Investment Our Community"
                  className="img-fluid rounded-4 shadow-sm w-100"
                  style={{ objectFit: "cover", maxHeight: "400px" }}
                />
              </div>


            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
