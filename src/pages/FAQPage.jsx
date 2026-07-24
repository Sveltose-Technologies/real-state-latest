import React, { useEffect, useState } from "react";
import { BASE_URL } from '../api/axios';
import { Plus, Minus } from "lucide-react";
import { getFaqBanner, getFaqQuestions } from "../services/userService";

// --- ACCORDION ITEM COMPONENT ---

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Colors from your exact screenshot references
    const textTitleColor = isOpen ? "#a97843" : "#1e293b";

    return (
        <div className="border-bottom border-light py-4">
            <button
                className="w-100 d-flex justify-content-between align-items-center text-start bg-transparent border-0 p-0"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                style={{ cursor: "pointer" }}
            >
                <span
                    className="fw-bold fs-5 pe-3"
                    style={{ color: textTitleColor, transition: "color 0.2s ease" }}
                >
                    {question}
                </span>
                <span className="text-secondary flex-shrink-0">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>

            {isOpen && (
                <div className="mt-3 text-muted lh-relaxed small pe-4 animate-fade-in">
                    {answer}
                </div>
            )}
        </div>
    );
};

// --- FAQ CATEGORY COMPONENT ---
const FAQCategory = ({ title, items = [] }) => {
    // If there are no items for this category, don't render it
    if (!items || items.length === 0) return null;

    return (
        <div className="mb-5 pb-4">
            <h2 className="fw-bold text-center text-dark mb-5">{title}</h2>
            <div className="row g-md-5">
                {/* Splits the list evenly into two side-by-side columns on medium devices and above */}
                <div className="col-12 col-md-6">
                    {items.slice(0, Math.ceil(items.length / 2)).map((item, index) => (
                        <FAQItem
                            key={`col1-${index}`}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </div>
                <div className="col-12 col-md-6">
                    {items.slice(Math.ceil(items.length / 2)).map((item, index) => (
                        <FAQItem
                            key={`col2-${index}`}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function FAQPage() {
    // 1. Moved State here to the Parent Component
    const [general, setGeneralFAQData] = useState([]);
    const [landlords, setLandlordFAQData] = useState([]);
    const [tenants, setTenantFAQData] = useState([]);
    const [bannerData, setBannerData] = useState([]);

    const getAllFAQ = async () => {
        try {
            const response = await getFaqQuestions();

            // Target the first object in the response array
            const faqData = response?.data?.[0];

            // If faqData exists, set the specific arrays to state
            if (faqData) {
                setGeneralFAQData(faqData.general || []);
                setLandlordFAQData(faqData.landlords || []);
                setTenantFAQData(faqData.tenants || []);
            } else {
                // Fallback in case the array is completely empty
                setGeneralFAQData([]);
                setLandlordFAQData([]);
                setTenantFAQData([]);
            }
        } catch (error) {
            console.error("Failed to fetch FAQs:", error);
        }
    };

    const geBanner = async () => {
        try {
            const response = await getFaqBanner();
            setBannerData(response?.data);
        } catch (error) {
            console.error("Failed to fetch FAQ banner:", error);
        }
    };

    useEffect(() => {
        geBanner();
        getAllFAQ();
    }, []);

    return (
        <div className="w-100 bg-white min-vh-screen">
            {/* Hero Section Container */}
            <section
                style={{ backgroundColor: "#2b3543" }}
                className="text-white py-5 px-3 px-md-5"
            >
                <div className="container py-4">
                    {bannerData.map((item, index) => (
                        <div className="row align-items-center g-5">
                            {/* Left Content Column */}
                            <div className="col-12 col-md-6">
                                <h1 className="fw-semibold mb-4 text-white">
                                    {item?.title || "Frequently Asked Questions"}
                                </h1>
                                <p className="text-white-50 mb-5 fs-6 lh-base pe-md-4">
                                    {item?.description || ""}
                                </p>
                                <button
                                    onClick={() => router.push("/contact")}
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

                            {/* Right Image Column */}
                            <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
                                <img
                                    src={`${BASE_URL}${item.image}`}
                                    alt="Home Doormat"
                                    className="img-fluid rounded-4 shadow"
                                    style={{
                                        maxHeight: "380px",
                                        objectFit: "cover",
                                        width: "100%",
                                        maxWidth: "480px",
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Accordions Container */}
            <section className="container my-5 py-5">
                {/* State variables are now defined in this scope! */}
                <FAQCategory title="Landlords" items={landlords} />
                <FAQCategory title="Tenants" items={tenants} />
                <FAQCategory title="General" items={general} />
            </section>
        </div>
    );
}
