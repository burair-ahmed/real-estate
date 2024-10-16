// src/pages/properties/[slug].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PropertyDetail = () => {
    const router = useRouter();
    const { slug } = router.query; // Get the slug from the URL
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            // Fetch property data based on the slug
            const fetchProperty = async () => {
                try {
                    const res = await fetch(`/api/properties/${slug}`);
                    if (!res.ok) throw new Error('Failed to fetch property');
                    const data = await res.json();
                    setProperty(data.property);
                } catch (error) {
                    console.error('Error fetching property:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProperty();
        }
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!property) return <p>No property found!</p>;

    return (
        <div>
            <h1>{property.title}</h1>
            <img src={property.images[0] || '/img/default-image.jpg'} alt={property.title} />
            <p>{property.description}</p>
            <p>Price: {property.price}</p>
            <p>State: {property.state}</p>
            <p>Country: {property.country}</p>
            <p>Address: {property.address}</p>
            <p>Zip Code: {property.zipCode}</p>
            {/* Add other property details here */}
        </div>
    );
};

export default PropertyDetail;
