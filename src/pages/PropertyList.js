// src/pages/PropertyList.js or src/components/PropertyList.js
import React, { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard'; // Adjust the import path as necessary
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/listings'); // Adjust the endpoint as necessary
        setProperties(response.data);
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="property-list">
      {properties.map((property) => (
        <PropertyCard
          key={property._id} // Use the unique property ID
          propertyData={property}
          slug={property.slug} // Ensure this field exists in your data
          baseUrl="properties" // Adjust according to your routing structure
        />
      ))}
    </div>
  );
};

export default PropertyList;
