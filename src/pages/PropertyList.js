// src/pages/PropertyList.js or src/components/PropertyList.js
import React, { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard'; 
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/listings'); 
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
          key={property._id} 
          propertyData={property}
          slug={property.slug} 
          baseUrl="properties" 
        />
      ))}
    </div>
  );
};

export default PropertyList;
