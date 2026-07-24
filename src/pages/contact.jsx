"use client";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getAllContactApi, sendInquiryApi } from "../services/userService";

function Contact() {
    const { data, fetchData } = useFetch(getAllContactApi);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const contactItem = data && data.length > 0 ? data[0] : null;

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNo: "",
        message: "",
    });
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        try {
            await sendInquiryApi(formData);
            alert("Inquiry sent successfully!");
            setFormData({ fullName: "", email: "", phoneNo: "", message: "" });
        } catch (error) {
            alert(
                "Error: " + (error.response?.data?.message || "Server not responding"),
            );
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="contact-page-wrapper">
            {/* HERO BANNER */}
            <section className="contact-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>Contact</h1>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <section className="contact-content-section">
                <div className="contact-container">
                    <div className="contact-grid">
                        
                        {/* LEFT COLUMN: CONTACT DETAILS */}
                        <div className="contact-info">
                            <h2 className="section-title">Contact Us If You Have More Questions.</h2>
                            
                            <ul className="info-list">
                                {/* Location */}
                                <li>
                                    <div className="icon-wrapper">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#333"/>
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <h4>Location</h4>
                                        <p>{contactItem ? contactItem.location : "Loading..."}</p>
                                    </div>
                                </li>

                                {/* Phone */}
                                <li>
                                    <div className="icon-wrapper">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="#333"/>
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <h4>Phone</h4>
                                        {contactItem && contactItem.contactNo ? (
                                            <>
                                                <a href={`tel:${contactItem.contactNo[0]}`}>{contactItem.contactNo[0]}</a>
                                                {contactItem.contactNo[1] && <><br /><a href={`tel:${contactItem.contactNo[1]}`}>{contactItem.contactNo[1]}</a></>}
                                            </>
                                        ) : "Loading..."}
                                    </div>
                                </li>

                                {/* Email */}
                                <li>
                                    <div className="icon-wrapper">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.15 8.09 4 7.82 4 7.53C4 6.86 4.73 6.46 5.3 6.81L12 11L18.7 6.81C19.27 6.46 20 6.86 20 7.53C20 7.82 19.85 8.09 19.6 8.25Z" fill="#333"/>
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <h4>Email</h4>
                                        {contactItem && contactItem.email ? (
                                            <>
                                                <a href={`mailto:${contactItem.email[0]}`}>{contactItem.email[0]}</a>
                                                {contactItem.email[1] && <><br /><a href={`mailto:${contactItem.email[1]}`}>{contactItem.email[1]}</a></>}
                                            </>
                                        ) : "Loading..."}
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* RIGHT COLUMN: FORM */}
                        <div className="contact-form-section">
                            <h2 className="section-title">Have Any Questions</h2>
                            
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group full-width">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter your name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group half-width">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group half-width">
                                        <input
                                            type="text"
                                            name="phoneNo"
                                            placeholder="Enter your Phone"
                                            value={formData.phoneNo}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group full-width">
                                    <textarea
                                        rows={6}
                                        name="message"
                                        placeholder="Your message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-btn" disabled={isSending}>
                                    {isSending ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* STYLES */}
            <style jsx>{`
                /* GLOBAL OVERRIDES */
                :global(body) {
                    margin: 0;
                    padding: 0;
                    font-family: 'Inter', sans-serif;
                }

                /* HERO SECTION */
                .contact-hero {
                    position: relative;
                    width: 100vw;
                    margin-left: calc(-50vw + 50%);
                    height: 450px;
                    background-image: url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920');
                    background-size: cover;
                    background-position: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .hero-overlay {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                }
                .hero-content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                    color: white;
                }
                .hero-content h1 {
                    font-size: 3.5rem;
                    font-family: 'Georgia', serif;
                    font-weight: 500;
                    letter-spacing: 1px;
                }

                /* CONTENT SECTION */
                .contact-content-section {
                    padding: 80px 20px;
                    background: #fff;
                }
                .contact-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    align-items: start;
                }

                /* SECTION TITLES */
                .section-title {
                    font-size: 2.2rem;
                    font-family: 'Georgia', serif;
                    color: #2c3e50;
                    margin-bottom: 40px;
                    line-height: 1.3;
                }

                /* INFO LIST (LEFT COLUMN) */
                .info-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .info-list li {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 35px;
                }
                .icon-wrapper {
                    width: 50px;
                    height: 50px;
                    background: #f8f9fa;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 20px;
                    flex-shrink: 0;
                }
                .info-text h4 {
                    font-size: 1.2rem;
                    color: #2c3e50;
                    margin: 0 0 5px 0;
                    font-weight: 600;
                }
                .info-text p, .info-text a {
                    color: #555;
                    font-size: 1rem;
                    line-height: 1.6;
                    text-decoration: none;
                    margin: 0;
                }
                .info-text a:hover {
                    color: #17a2b8;
                }

                /* FORM (RIGHT COLUMN) */
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .form-row {
                    display: flex;
                    gap: 20px;
                }
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 15px 20px;
                    border: 1px solid #e1e1e1;
                    border-radius: 4px;
                    background: #fafafa;
                    font-size: 1rem;
                    font-family: inherit;
                    color: #333;
                    transition: border-color 0.3s;
                }
                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #17a2b8;
                    background: #fff;
                }
                .half-width {
                    flex: 1;
                }
                .full-width {
                    width: 100%;
                }
                
                /* SUBMIT BUTTON */
                .submit-btn {
                    align-self: flex-start;
                    background: transparent;
                    color: #333;
                    border: 1px solid #ccc;
                    padding: 12px 30px;
                    border-radius: 50px; /* Pill shape */
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .submit-btn:hover:not(:disabled) {
                    background: #2c3e50;
                    color: #fff;
                    border-color: #2c3e50;
                }
                .submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                /* RESPONSIVE DESIGN */
                @media (max-width: 992px) {
                    .contact-grid {
                        grid-template-columns: 1fr; /* Stack columns */
                        gap: 40px;
                    }
                }
                @media (max-width: 576px) {
                    .form-row {
                        flex-direction: column;
                        gap: 20px;
                    }
                    .hero-content h1 {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default Contact;
