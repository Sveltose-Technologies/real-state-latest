import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RentedPropertyDetails = () => {
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Grab data from session storage
        const storedProperty = sessionStorage.getItem("selectedRentedProperty");

        if (storedProperty && storedProperty !== "undefined") {
            try {
                setProperty(JSON.parse(storedProperty));
            } catch (error) {
                console.error("Failed to parse rented property data:", error);
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <p style={{ textAlign: "center", padding: "50px" }}>
                Loading property details...
            </p>
        );
    }

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
                    onClick={() => navigate("/rented-properties")} // Change to your list route
                    style={{ padding: "10px 20px", cursor: "pointer", marginTop: "10px" }}
                >
                    Go back to listings
                </button>
            </div>
        );
    }

    // 2. Destructure the safe data
    const {
        heading,
        displayAddress,
        searchPrice,
        description,
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

            {/* Property Image with 'Leased' Badge overlay */}
            {imageUrl && (
                <div
                    style={{
                        marginBottom: "24px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "15px",
                            left: "15px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            padding: "6px 14px",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            zIndex: 2,
                        }}
                    >
                        Leased
                    </div>
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

            {/* Header Section */}
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


                {/* Features */}
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
                    <span>🚗 {garages} Parking</span>
                </div>

                <p
                    style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#6c757d",
                        margin: 0,
                    }}
                >
                    {searchPrice ? `Rent $${searchPrice} / week` : "Price Withheld"}
                </p>
            </header>

            {/* Description Section */}
            <section style={{ marginBottom: "60px" }}>
                <h2
                    style={{ fontSize: "20px", marginBottom: "12px", color: "#2c3e50" }}
                >
                    Property Description
                </h2>
                <div
                    style={{ whiteSpace: "pre-line", lineHeight: "1.6", color: "#444" }}
                >
                    {description || "No description was provided for this property."}
                </div>
            </section>

        </div>
    );
};

export default RentedPropertyDetails;
