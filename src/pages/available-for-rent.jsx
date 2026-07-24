import { useEffect, useState } from "react";
import { availableForRent } from "../services/userService";
import { useNavigate } from "react-router-dom";



const AvailableForRent = () => {
  const [propertiesTest, setProperties] = useState([]);
  const [propertiesAllData, setPropertiesAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  const getProperty = async () => {
    console.log("Fetching property details from API...");
    setLoading(true);

    try {
      const propertyResponse = await availableForRent();
      console.log("Property details:", propertyResponse?.data);
      setPropertiesAllData(propertyResponse?.data);
      let apiData = [];

      // Handle different possible response structures
      if (Array.isArray(propertyResponse?.data)) {
        apiData = propertyResponse.data;
      } else if (
        propertyResponse?.data?.properties &&
        Array.isArray(propertyResponse.data.properties)
      ) {
        apiData = propertyResponse.data.properties;
      }

      if (apiData.length > 0) {
        const formattedProperties = apiData.map((item) => {
          // 1. Safely extract the first photo URL
          const photoUrl =
            item.photos && item.photos.length > 0
              ? item.photos[0].url ||
              item.photos[0].link ||
              "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600"
              : "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600";

          // 2. Safely parse the address into a string
          let safeAddress = "Address not available";
          if (
            typeof item.displayAddress === "string" &&
            item.displayAddress.trim() !== ""
          ) {
            safeAddress = item.displayAddress;
          } else if (item.address && typeof item.address === "object") {
            const { unitNumber, streetNumber, street } = item.address;
            safeAddress =
              `${unitNumber ? unitNumber + "/" : ""}${streetNumber || ""} ${street || ""}`.trim();
          } else if (typeof item.address === "string") {
            safeAddress = item.address;
          }

          // 3. Return the clean object PLUS the detailsData for the next page
          return {
            id: item.id || Math.random(),
            image: photoUrl,
            address: safeAddress,
            price: item.searchPrice
              ? `$${item.searchPrice} per week`
              : "Price on Application",
            beds: item.bed || 0,
            baths: item.bath || 0,
            cars: (item.garages || 0) + (item.carports || 0),

            detailsData: {
              id: item.id,
              heading: item.heading || "",
              displayAddress: safeAddress,
              searchPrice: item.searchPrice,
              description: item.description,
              bed: item.bed || 0,
              bath: item.bath || 0,
              garages: item.garages || 0,
              contactStaff: item.contactStaff || [],
              imageUrl: photoUrl,
            },
          };
        });

        setProperties(formattedProperties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProperty();
  }, []);

  // Use API data if available, otherwise show fallback data
  const dataToRender =
    propertiesTest.length > 0 ? propertiesTest : propertiesTest;

  return (
    <div className="rentals-page">
      {/* 1. HERO SECTION - BREAKS OUT OF CONTAINER */}
      {/* <Header2 /> */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Houses for rent</h1>
          <p>Looking for a rental properties?</p>
          <p className="sub-text">
            Click below to explore our available properties. You can schedule a
            viewing, request a private showing, or submit a rental application
            with ease.
          </p>
          <button
            onClick={() => navigate("/tenants/rented-properties")}
            className="btn-rent"
          >
            See previously rented properties
          </button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800"
            alt="Kitchen Interior"
          />
        </div>
      </section>

      {/* 2. LISTINGS SECTION */}
      <div className="container">
        <h2 className="section-title">Available houses for rent</h2>

        {loading && propertiesTest.length === 0 ? (
          <p style={{ textAlign: "center" }}>Loading properties...</p>
        ) : (
          <div className="property-grid">
            {dataToRender.map((prop) => (
              <div
                key={prop.id}
                className="property-card"
                style={{ cursor: "pointer" }} // Added pointer so users know it is clickable
                onClick={() => {
                  // SAVE ONLY THE SPECIFIC OBJECT TO SESSION STORAGE
                  sessionStorage.setItem(
                    "selectedProperty",
                    JSON.stringify(prop.detailsData),
                  );
                  navigate("/available-property-details");
                }}
              >
                <div className="img-container">
                  <img src={prop.image} alt="Property" />
                </div>
                <div className="card-details">
                  <p className="address">{prop.address}</p>
                  <p className="price">{prop.price}</p>
                  <div className="icons">
                    <span>🛏 {prop.beds}</span>
                    <span>🚿 {prop.baths}</span>
                    <span>🚗 {prop.cars}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        /* RESET GLOBAL MARGINS */
        :global(body) {
          margin: 0;
          font-family: "Inter", sans-serif;
          overflow-x: hidden;
        }

        /* HERO FIX: Force full width regardless of parent */
        .hero-banner {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          display: flex;
          background-color: #0c3547;
          min-height: 400px;
          flex-wrap: wrap;
        }

        .hero-content {
          flex: 1;
          color: white;
          padding: 60px 10%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 350px;
        }

        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        .sub-text {
          opacity: 0.8;
          font-size: 0.9rem !important;
          margin-bottom: 30px !important;
          line-height: 1.6;
        }

        .btn-rent {
          background: #17a2b8;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          width: fit-content;
          cursor: pointer;
        }

        .hero-image {
          flex: 1;
          min-width: 350px;
        }
        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* GRID SECTION */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .section-title {
          text-align: center;
          color: #333;
          margin-bottom: 40px;
        }

        .property-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .property-card {
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .property-card:hover {
          transform: translateY(-5px);
        }

        .img-container img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .card-details {
          padding: 15px 0;
        }
        .address {
          font-weight: bold;
          color: #0c3547;
          margin-bottom: 5px;
          min-height: 48px;
        }
        .price {
          color: #17a2b8;
          font-weight: bold;
          font-size: 1.1rem;
        }
        .icons {
          margin-top: 10px;
          color: #666;
          display: flex;
          gap: 15px;
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 768px) {
          .hero-content {
            padding: 40px 20px;
          }
          .hero-content h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AvailableForRent;
