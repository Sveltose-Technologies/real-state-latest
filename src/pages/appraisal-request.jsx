import React, { useState } from "react";
import { appraisalForm } from "../services/userService";
// 1. Import toast, ToastContainer, and the CSS
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AppraisalRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    propertyAddress: "",
    otherDetails: "",
  });

  const navyColor = "#0b2b46"; // Matching your brand navy

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Validation
    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.phoneNumber) {
      const cleanedPhone = formData.phoneNumber.replace(/[\s-]/g, "");
      const isValidIN = /^(\+91)?0?[6789]\d{9}$/.test(cleanedPhone);
      const isValidNZ = /^(\+64)?0?[2-9]\d{7,9}$/.test(cleanedPhone);

      if (!isValidIN && !isValidNZ) {
        toast.error("Please enter a valid Indian or New Zealand phone number.");
        return;
      }
    } else {
      toast.error("Phone number is required.");
      return;
    }

    if (!formData.propertyAddress.trim()) {
      toast.error("Property address is required.");
      return;
    }
    try {
      const res = await appraisalForm(formData);
      // This will now work!
      toast.success(res?.message || "Form submitted successfully!");

      // Optional: Clear the form after success
      setFormData({ name: "", email: "", phoneNumber: "", propertyAddress: "", otherDetails: "" });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.log(error);
      // This will also work!
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div
      className="appraisal-page"
      style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}
    >
      {/* 2. Add the ToastContainer so the popups have a place to render */}
      <ToastContainer position="top-right" autoClose={3000} />

      <section className="container py-5" style={{ maxWidth: "800px" }}>
        <h1 className="mb-3" style={{ color: "#001a33", fontSize: "2.5rem" }}>
          Request A Free Rent Appraisal
        </h1>
        <p className="mb-5 text-muted" style={{ fontSize: "1.05rem", lineHeight: "1.5" }}>
          Get a data-backed rental estimate and simple recommendations utilising local market
          knowledge to minimise vacancy - fast, free and no obligation.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Name Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-1">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="form-control custom-input"
                placeholder="Name"
                required
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-1">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-control custom-input"
                placeholder="Email Address"
                required
                onChange={handleChange}
              />
            </div>

            {/* Phone Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-1">
                Phone <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                className="form-control custom-input"
                placeholder="Phone Number"
                required
                onChange={handleChange}
              />
            </div>

            {/* Address Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-1">
                Property Address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="propertyAddress"
                value={formData.propertyAddress}
                className="form-control custom-input"
                placeholder="Address"
                required
                onChange={handleChange}
              />
            </div>

            {/* Other Details Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-1">Other Details</label>
              <input
                type="text"
                name="otherDetails"
                value={formData.otherDetails}
                className="form-control custom-input"
                placeholder="Any other information"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="col-12 mt-4">
              <button
                type="submit"
                className="btn px-4 py-2 fw-bold text-white shadow-sm"
                style={{
                  backgroundColor: "var(--primary-color)",
                  borderRadius: "8px",
                  fontSize: "15px",
                  border: "none",
                }}
              >
                Submit Form
              </button>
            </div>
          </div>
        </form>
      </section>

      <style jsx>{`
        .custom-input {
          background-color: #e2e2e2 !important;
          border: none !important;
          border-radius: 6px !important;
          padding: 12px 15px !important;
          color: #555 !important;
          font-size: 1.05rem !important;
        }
        .custom-input::placeholder {
          color: #888;
        }
        .custom-input:focus {
          box-shadow: 0 0 0 2px rgba(160, 118, 57, 0.3) !important;
          outline: none;
        }
        @media (max-width: 768px) {
          .appraisal-page h1 {
            text-align: center;
            padding: 0 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default AppraisalRequest;
