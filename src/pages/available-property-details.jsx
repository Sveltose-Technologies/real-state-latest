import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AvailablePropertyDetails = () => {
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    // Grab the data from sessionStorage when the page loads
    useEffect(() => {
        const storedProperty = sessionStorage.getItem("selectedProperty");

        // 👉 Added check: ensure it exists AND doesn't literally equal the string "undefined"
        if (storedProperty && storedProperty !== "undefined") {
            try {
                setProperty(JSON.parse(storedProperty));
            } catch (error) {
                console.error("Failed to parse property data:", error);
            }
        }
        setLoading(false);
    }, []);

    // Show loading state while Next.js reads the browser storage
    if (loading) {
        return (
            <p style={{ textAlign: "center", padding: "50px" }}>
                Loading property details...
            </p>
        );
    }

    // Handle case where user navigates directly without clicking a card
    if (!property) {
        return (
            <div
                style={{
                    padding: "50px",
                    textAlign: "center",
                    fontFamily: "sans-serif",
                }}
            >
                <h2>Property not found</h2>
                <p>Please go back and select a property to view its details.</p>
                <button
                    onClick={() => navigate("/available-for-rent")} // Adjust this route if needed
                    style={{ padding: "10px 20px", cursor: "pointer", marginTop: "10px" }}
                >
                    Go back to listings
                </button>
            </div>
        );
    }

    // Destructure the fields we saved in detailsData
    const {
        heading,
        displayAddress,
        searchPrice,
        description,
        contactStaff,
        imageUrl,
        bed,
        bath,
        garages,
    } = property;

    return (
        <div
            style={{
                maxWidth: "800px",
                margin: "40px auto",
                padding: "0 20px",
                fontFamily: "sans-serif",
            }}
        >
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: "20px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    background: "#eee",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            >
                &larr; Back to Listings
            </button>

            {/* Property Image */}
            {imageUrl && (
                <div
                    style={{
                        marginBottom: "24px",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={displayAddress}
                        style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "450px",
                            objectFit: "cover",
                        }}
                    />
                </div>
            )}

            {/* Header Section: Address and Price */}
            <header
                style={{
                    borderBottom: "2px solid #eee",
                    paddingBottom: "16px",
                    marginBottom: "24px",
                }}
            >
                <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
                    {heading || displayAddress}
                </h1>


                {/* Quick Features */}
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "16px",
                        fontSize: "16px",
                        color: "#666",
                    }}
                >
                    <span>🛏 {bed} Beds</span>
                    <span>🚿 {bath} Baths</span>
                    <span>🚗 {garages} Garages</span>
                </div>

                <p
                    style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#2c3e50",
                        margin: 0,
                    }}
                >
                    Rent ${searchPrice ? searchPrice : "POA"}/ week{" "}
                    <span style={{ fontSize: "16px", fontWeight: "normal" }}></span>
                </p>
            </header>

            {/* Description Section */}
            <section style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>
                    Property Description
                </h2>
                {/* whiteSpace: 'pre-line' ensures the \r\n line breaks in your API data render correctly */}
                <div
                    style={{ whiteSpace: "pre-line", lineHeight: "1.6", color: "#333" }}
                >
                    {description || "No description available for this property."}
                </div>
            </section>

            {/* Contact Staff Section */}
            <section style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>
                    Contact Agent
                </h2>
                {contactStaff && contactStaff.length > 0 ? (
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                        {/* FIX APPLIED HERE: Added .slice(0, 1) */}
                        {contactStaff.slice(0, 1).map((staff) => (
                            <div
                                key={staff.id}
                                style={{
                                    padding: "16px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    minWidth: "250px",
                                }}
                            >
                                <p style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>
                                    {staff.firstName} {staff.lastName}
                                </p>
                                <p style={{ margin: "0 0 8px 0", color: "#666" }}>
                                    <a
                                        href={`mailto:${staff.email}`}
                                        style={{ color: "#0066cc", textDecoration: "none" }}
                                    >
                                        {staff.email}
                                    </a>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No contact details provided.</p>
                )}
            </section>

            {/* Action Button */}
            <section style={{ marginTop: "40px", marginBottom: "60px" }}>
                <a
                    href="https://renti.co/browse/real-estate-shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-block",
                        backgroundColor: "#0055a4",
                        color: "white",
                        padding: "14px 28px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        borderRadius: "6px",
                        textAlign: "center",
                        cursor: "pointer",
                    }}
                >
                    Apply Now
                </a>
            </section>
        </div>
    );
};

export default AvailablePropertyDetails;