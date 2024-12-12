import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard"; // Reuse your PropertyCard component
import TitleSection from "../titleSection"; // Assuming TitleSection is at this path

const RecentRentedProperties = () => {
  const [rentedProperties, setRentedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the rented properties from the new API route
  const fetchRentedProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/rented-properties"); // New API route for rented properties
      const data = await response.json();

      if (response.ok) {
        setRentedProperties(data);
      } else {
        setError(data.message || "Failed to fetch rented properties");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rented properties:", error);
      setError("Failed to load rented properties.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentedProperties();
  }, []);

  return (
    <div className="recent-rented-properties">
      {/* Title Section */}
      <TitleSection
        sectionClasses="text-center"
        headingClasses="section-subtitle-2"
        titleSectionData={{
          subTitle: "Properties",
          title: "Recently Rented Properties",
          additionalClassName: "",
        }}
      />
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {rentedProperties.length > 0 ? (
        <div className="property-grid">
          {rentedProperties.map((property) => (
            <PropertyCard
              key={property.slug}
              propertyData={property}
              wishlistItem={null} // Pass your wishlist logic here if needed
            />
          ))}
        </div>
      ) : (
        !loading && <p>No rented properties available at the moment.</p>
      )}
      
      <style jsx>{`
        .recent-rented-properties {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .recent-rented-properties h2 {
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

export default RecentRentedProperties;
