import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRentedProperties } from "../services/userService";

const RentedProperties = () => {
  const [rentedListings, setRentedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();


  const fetchRentedProperties = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await getRentedProperties();

      let apiData = [];
      if (Array.isArray(response?.data)) {
        apiData = response.data;
      } else if (
        response?.data?.properties &&
        Array.isArray(response.data.properties)
      ) {
        apiData = response.data.properties;
      }
      if (apiData.length > 0) {
        // Sort by most recently modified
        apiData.sort((a, b) => new Date(b.modified) - new Date(a.modified));

        // Map data safely to avoid React child object errors
        const formattedData = apiData.map((item) => {
          // Extract first photo safely
          const photoUrl =
            item.photos && item.photos.length > 0
              ? item.photos[0].url
              : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600"; // Professional default fallback

          // Extract address safely
          let safeAddress = "Address not available";
          if (
            typeof item.displayAddress === "string" &&
            item.displayAddress.trim() !== ""
          ) {
            safeAddress = item.displayAddress;
          } else if (item.address && typeof item.address === "object") {
            const { unitNumber, streetNumber, street, suburb } = item.address;
            const suburbName = suburb?.name || "";
            safeAddress =
              `${unitNumber ? unitNumber + "/" : ""}${streetNumber || ""} ${street || ""}, ${suburbName}`.trim();
          }

          return {
            id: item.id || Math.random(),
            image: photoUrl,
            address: safeAddress,
            price: item.searchPrice
              ? `$${item.searchPrice} per week`
              : "Price Withheld",
            beds: item.bed || 0,
            baths: item.bath || 0,
            cars: (item.garages || 0) + (item.carports || 0),
            detailsData: {
              id: item.id,
              heading: safeAddress,
              displayAddress: safeAddress,
              searchPrice: item.searchPrice,
              description: item.description,
              bed: item.bed || 0,
              bath: item.bath || 0,
              garages: item.garages || 0,
              imageUrl: photoUrl,
            },
          };
        });

        setRentedListings(formattedData);
      }
    } catch (err) {
      console.error("Failed to fetch rented properties:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRentedProperties();
  }, []);

  return (
    <div className="rented-page">
      {/* <Header2 /> */}

      {/* PROFESSIONAL HERO SECTION */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Successfully Leased</h1>
          <p>Explore our portfolio of recently rented properties.</p>
          <div className="divider"></div>
        </div>
      </section>

      {/* LISTINGS SECTION */}
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Recently Rented Properties</h2>
          <p className="section-subtitle">
            A showcase of homes we've successfully matched with great tenants.
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading past rentals...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>
              We couldn't load the properties at this time. Please try again
              later.
            </p>
            <button onClick={fetchRentedProperties} className="btn-retry">
              Retry
            </button>
          </div>
        ) : rentedListings.length === 0 ? (
          <div className="empty-state">
            <p>No rented properties found.</p>
          </div>
        ) : (
          <div className="property-grid">
            {rentedListings.map((prop) => (
              <div
                key={prop.id}
                className="property-card"
                style={{ cursor: "pointer" }} // Make it look clickable
                onClick={() => {
                  // 4. SAVE TO SESSION STORAGE AND REDIRECT
                  sessionStorage.setItem(
                    "selectedRentedProperty",
                    JSON.stringify(prop.detailsData),
                  );
                  navigate("/rented-properties-details");
                }}
              >
                <div className="img-container">
                  <div className="rented-badge">Rented</div>
                  <img src={prop.image} alt={prop.address} loading="lazy" />
                </div>
                <div className="card-details">
                  <p className="address">{prop.address}</p>
                  <p className="price">{prop.price}</p>
                  <div className="icons">
                    <span title="Bedrooms">🛏 {prop.beds}</span>
                    <span title="Bathrooms">🚿 {prop.baths}</span>
                    <span title="Parking">🚗 {prop.cars}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: "Inter", "Segoe UI", sans-serif;
          background-color: #f8f9fa;
        }

        /* HERO SECTION */
        .hero-banner {
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          height: 40vh;
          min-height: 350px;
          background-image: url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(12, 53, 71, 0.75); /* Dark blue overlay */
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
          padding: 0 20px;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 15px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .hero-content p {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .divider {
          width: 60px;
          height: 3px;
          background-color: #17a2b8;
          margin: 20px auto 0;
        }

        /* CONTAINER & HEADERS */
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-title {
          color: #0c3547;
          font-size: 2.2rem;
          margin-bottom: 10px;
        }

        .section-subtitle {
          color: #6c757d;
          font-size: 1.1rem;
        }

        /* GRID & CARDS */
        .property-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .property-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid #eaeaea;
        }

        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        .img-container {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .property-card:hover .img-container img {
          transform: scale(1.05);
        }

        /* RENTED BADGE */
        .rented-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background-color: #dc3545; /* Professional red for rented/sold */
          color: white;
          padding: 6px 14px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .card-details {
          padding: 24px;
        }

        .address {
          font-weight: 600;
          color: #2b2b2b;
          font-size: 1.1rem;
          margin-bottom: 8px;
          line-height: 1.4;
          min-height: 48px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .price {
          color: #6c757d; /* Muted color for past prices */
          font-weight: 500;
          font-size: 1.1rem;
          margin-bottom: 20px;
        }

        .icons {
          display: flex;
          gap: 20px;
          padding-top: 15px;
          border-top: 1px solid #f0f0f0;
          color: #555;
          font-size: 0.95rem;
        }

        .icons span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* STATES (Loading, Error, Empty) */
        .loading-state,
        .error-state,
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #6c757d;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #17a2b8;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        .btn-retry {
          margin-top: 15px;
          background: #0c3547;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.5rem;
          }
          .section-title {
            font-size: 1.8rem;
          }
          .container {
            padding: 50px 15px;
          }
        }
      `}</style>
      {/* <Footer /> */}
    </div>
  );
};

export default RentedProperties;
