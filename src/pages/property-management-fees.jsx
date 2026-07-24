import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import {
  getPricingBanner,
  getPricingContent,
  getPricingFormContent,
  pricingForm,
} from "../services/userService";
import { useNavigate } from "react-router-dom";

// --- CUSTOM ACCORDION COMPONENT ---
const ServiceAccordionItem = ({ title, description, isFirst }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="py-4"
      style={{
        borderBottom: "2px solid #c9a781",
        borderTop: isFirst ? "2px solid #c9a781" : "none",
      }}
    >
      <button
        className="w-100 d-flex justify-content-between align-items-center text-start bg-transparent border-0 p-0"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        style={{ cursor: "pointer" }}
      >
        <span className="fs-5 text-dark pe-3" style={{ fontFamily: "serif" }}>
          {title}
        </span>
        <span className="text-dark flex-shrink-0 fw-bold">
          {isOpen ? (
            <Minus size={24} strokeWidth={3} />
          ) : (
            <Plus size={24} strokeWidth={3} />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="mt-3 text-muted small pe-4 animate-fade-in">
          {description}
        </div>
      )}
    </div>
  );
};

const BaseUrl = `https://backend.realestateshop.co.nz`;

// --- MAIN PAGE COMPONENT ---
export default function PropertyManagementFees() {
  const [bannerData, setBannerData] = useState(null);
  const [contentForm, setContentForm] = useState(null);
  const [pricingContent, setPricingContent] = useState(null);
  const navigate = useNavigate();

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const getBannerData = async () => {
    try {
      const response = await getPricingBanner();
      setBannerData(response?.data);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };

  // pricing content
  const getContentForm = async () => {
    try {
      const response = await getPricingFormContent();
      setContentForm(response?.data);
    } catch (error) {
      console.error("Error fetching pricing form content:", error);
    }
  };

  // pricing content
  const getPriceContentAPI = async () => {
    try {
      const response = await getPricingContent();
      setPricingContent(response?.data);
    } catch (error) {
      console.error("Error fetching pricing content:", error);
    }
  };

  useEffect(() => {
    getBannerData();
    getContentForm();
    getPriceContentAPI();
  }, []);

  // --- FORM HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        loading: false,
        success: false,
        error: "Please fill out all fields.",
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      await pricingForm(formData);

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });

      setTimeout(
        () => setStatus((prev) => ({ ...prev, success: false })),
        5000,
      );
    } catch (error) {
      console.error("Error submitting form:", error);

      // Attempt to extract the specific error message from the backend
      const exactError =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send message. Please try again later.";

      setStatus({
        loading: false,
        success: false,
        error: `API Error: ${exactError}`,
      });
    }
  };

  return (
    <div className="w-100 bg-white min-vh-100 font-sans">
      {/* 1. Hero Section */}
      <section
        style={{ backgroundColor: "#2b3543" }}
        className="text-white py-5 px-3 px-md-5"
      >
        <div className="container py-5">
          {bannerData?.map((item, index) => (
            <div className="row align-items-center g-5" key={index}>
              <div className="col-12 col-lg-6">
                <h1 className="display-4 fw-semibold mb-3 text-white">
                  {item?.title || "Loading..."}
                </h1>
                <p className="text-white-50 mb-5 fs-6 lh-base pe-md-4">
                  {item?.description || ""}
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="btn btn-sm text-white fw-bold px-5 py-3 rounded-pill shadow-sm"
                  style={{ backgroundColor: "#0e5c35", border: "none" }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#0e5c35")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#0e5c35")
                  }
                >
                  CONTACT US
                </button>
              </div>

              <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
                <img
                  src={`${BaseUrl}/${item.image}`}
                  alt="Property Representation"
                  className="img-fluid rounded-4 shadow-lg"
                  style={{
                    maxHeight: "450px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Pricing & Form Section */}
      <section className="container my-5 py-5">
        {contentForm?.map((item, index) => (
          <div className="row g-5" key={index}>
            {/* Dark Brand Card */}
            <div className="col-12 col-lg-5">
              <div
                className="h-100 rounded-4 p-5 d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "#2b3543" }}
              >
                <img
                  src={`${BaseUrl}${item?.image}`}
                  alt="Pricing Graphic"
                  className="img-fluid"
                  style={{ maxHeight: "300px", width: "auto" }}
                />
              </div>
            </div>

            {/* Fee Details & Contact Form */}
            <div className="col-12 col-lg-7 ps-lg-5">
              <h3 className="fs-2 mb-4" style={{ fontFamily: "serif" }}>
                {item?.title || "Our Fees Explained"}
              </h3>
              <ul className="mb-5 text-dark fs-6 lh-lg">
                <li>
                  {item?.description ||
                    `A fixed percentage + GST of all rent collected. We offer a
                    competitive rate designed to provide you with the best value.
                    Enquire below to receive our info pack.`}
                </li>
              </ul>

              <h4
                className="fs-3 mb-4 text-secondary"
                style={{ fontFamily: "serif" }}
              >
                Enquire About Our Fees
              </h4>

              <form onSubmit={handleSubmitForm}>
                {status.success && (
                  <div className="alert alert-success mb-3">
                    Thank you! Your enquiry has been sent successfully.
                  </div>
                )}
                {status.error && (
                  <div className="alert alert-danger mb-3">{status.error}</div>
                )}

                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control form-control-lg bg-light border-0 shadow-sm"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control form-control-lg bg-light border-0 shadow-sm"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control form-control-lg bg-light border-0 shadow-sm"
                    rows="4"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={status.loading}
                  className="btn text-white px-5 py-2 rounded-2 fw-semibold"
                  style={{ backgroundColor: "#0e5c35" }}
                >
                  {status.loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Services Accordion Section */}
      <section className="container my-5 pb-5">
        {pricingContent?.map((service, index) => (
          <div className="row g-5" key={index}>
            <div className="col-12 col-lg-4 pe-lg-5">
              <h2 className="display-6 fw-bold mb-4 text-dark">
                {service?.title || "No Extra Charges"}
              </h2>
              <p className="text-muted lh-lg">
                {service?.description || "All essential services included."}
              </p>
            </div>

            <div className="col-12 col-lg-8">
              <div className="d-flex flex-column">
                {service?.faqs?.map((faq, faqIndex) => (
                  <ServiceAccordionItem
                    key={faqIndex}
                    title={faq.question}
                    description={faq.answer}
                    isFirst={faqIndex === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
