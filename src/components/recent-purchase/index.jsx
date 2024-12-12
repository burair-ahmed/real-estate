import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard"; // Reuse your PropertyCard component
import TitleSection from "../titleSection";
const RecentSoldProperties = () => {
  const [soldProperties, setSoldProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the sold properties from the new API route
  const fetchSoldProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/sold-properties"); // New API route for sold properties
      const data = await response.json();

      if (response.ok) {
        setSoldProperties(data);
      } else {
        setError(data.message || "Failed to fetch sold properties");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sold properties:", error);
      setError("Failed to load sold properties.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoldProperties();
  }, []);

  return (
    <div className="recent-sold-properties">
    <TitleSection
                  sectionClasses="text-center"
                  headingClasses="section-subtitle-2"
                  titleSectionData={{
                    subTitle: "Properties",
                    title: "Recent Properties Sold",
                    additionalClassName: "",
                  }}
                />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {soldProperties.length > 0 ? (
        <div className="property-grid">
          {soldProperties.map((property) => (
            <PropertyCard
              key={property.slug}
              propertyData={property}
              wishlistItem={null} // Pass your wishlist logic here if needed
            />
          ))}
        </div>
      ) : (
        !loading && <p>No sold properties available at the moment.</p>
      )}
      <style jsx>{`
        .recent-sold-properties {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .recent-sold-properties h2 {
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
        }
        .property-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
};

export default RecentSoldProperties;
