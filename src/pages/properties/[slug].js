// src/pages/properties/[slug].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Slider from "react-slick";
import { Container } from "react-bootstrap"; // Ensure you're using Bootstrap for layout
import BreadCrumb from "@/components/breadCrumbs"; // Import your BreadCrumb component
import { LayoutOne } from "@/layouts"; // Import your Layout component

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

    const propertyDetailsCarouselSettings = {
        centerMode: true,
        infinite: true,
        centerPadding: "450px",
        slidesToShow: 1,
        dots: false,
        speed: 500,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "250px",
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "250px",
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "150px",
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "0px",
                    dots: true,
                },
            },
        ],
    };

    return (
        <LayoutOne>
            <BreadCrumb
                title="Property Details"
                sectionPace="mb-0"
                currentSlug={property.title}
            />
            <Container fluid className="px-0">
                {/* Property Image Slider Area */}
                <div className="ltn__img-slider-area mb-90">
                    <Slider
                        {...propertyDetailsCarouselSettings}
                        className="ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner"
                    >
                        {property.images.map((imageUrl, key) => (
                            <div className="ltn__img-slide-item-4" key={key}>
                                <img 
                                src={imageUrl} 
                                alt={`Property image ${key + 1}`} 
                                height={400}
                                width={700}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Property Details */}
                <h1>{property.title}</h1>
                <p>{property.description}</p>
                <p>Price: ${property.price.toLocaleString()}</p>
                <p>State: {property.state}</p>
                <p>Country: {property.country}</p>
                <p>Address: {property.address}</p>
                <p>Zip Code: {property.zipCode}</p>
                {/* Add other property details here */}
            </Container>
        </LayoutOne>
    );
};

export default PropertyDetail;
