// src/pages/properties/[slug].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import BreadCrumb from "@/components/breadCrumbs"; // Import your BreadCrumb component
import { LayoutOne } from "@/layouts"; // Import your Layout component
import { FaArrowRight, FaArrowLeft, FaBuilding, FaBinoculars } from "react-icons/fa";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import { getDisplayName } from "next/dist/shared/lib/utils";
import Preloader from "@/components/preloader";
import { FaBed, FaBath, FaRulerCombined, FaCouch, FaSnowflake, FaFireAlt, FaEye, FaCompass } from "react-icons/fa";
import styles from './FeatureIcons.module.css'; 

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
          if (!res.ok) throw new Error("Failed to fetch property");
          const data = await res.json();
          setProperty(data.property);
        } catch (error) {
          console.error("Error fetching property:", error);
        } finally {
          // Add a delay before setting loading to false
          setTimeout(() => {
            setLoading(false);
          }, 750); // Delay of 750 milliseconds
        }
      };
  
      fetchProperty();
    }
  }, [slug]);
  

  if (loading) {
    return <div><Preloader /></div>;
  }
  if (!property) return <p>No property found!</p>;

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <FaArrowLeft />
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <FaArrowRight />
    </button>
  );

  const propertyDetailsCarouselSettings = {
    centerMode: true,
    infinite: true,
    centerPadding: "450px",
    slidesToShow: 1,
    dots: false,
    speed: 500,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
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
       
        },
      },
    ],
  };

  const featureIcons = {
    area: { icon: <FaRulerCombined /> },
    bedrooms: { icon: <FaBed /> },
    rooms: { icon: <FaBed /> },
    bathrooms: { icon: <FaBath /> },
    furnished: { icon: <FaCouch/> },
    airConditioned: { icon: <FaSnowflake /> },
    view: { icon: <FaBinoculars/> },
    floor: { icon: <FaBuilding/> },
    direction: { icon: <FaCompass/> },
    fireplace: { icon: <FaFireAlt /> },
  };
  
  const renderFeatureIcons = (features) => {
    return Object.keys(features).map((key) => {
      const value = features[key];
      if (value) { // Only render if value is truthy
        const feature = featureIcons[key];
        return (
          <li key={key} className={styles.featureItem}>
           <div className={styles.icon}>{feature.icon}{" "}</div>
            <div className={styles.value}><span>{value === true ? 'Yes' : value}</span></div> {/* Show 'Yes' if the value is true */}
          </li>
        );
      }
      return null;
    });
  };
  
  const bathrooms = property.features.bathrooms
  const bedrooms = property.features.bedrooms


  let type = property.propertytype
  if(property.propertytype[0]){
    type = "For Sell"
  }
  else if(property.propertytype[1]){
    type = "For Rent"
  }
  else {type = "For Development"}
  
 
  return (
    <LayoutOne>
      <BreadCrumb
        title={property.title}
        sectionPace="mb-0"
        currentSlug={property.title}
      />
      <Container fluid className="px-0">
        {/* Property Image Slider Area */}
        <div className="ltn__img-slider-area mb-100">
          <Slider
            {...propertyDetailsCarouselSettings}
            className="row ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all g-0"
          >
            {property.video && (
              <div className="ltn__img-slide-item-4">
                <video
                  src={property.video}
                  controls
                  height={450}
                  width={700}
                  alt="Property video"
                />
              </div>
            )}

            {property.images.map((imageUrl, key) => (
              <div className="ltn__img-slide-item-4" key={key}>
                <img
                  src={imageUrl}
                  alt={`Property image ${key + 1}`}
                  height={450}
                  width={700}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="ltn__shop-details-area pb-10">
          <Container>
            <Row>
              <Col lg={8} md={12}>
                <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                  <h4 className="title-2">Property Features</h4>
                  <div className="property-features-list">
                    <ul>
                    {renderFeatureIcons(property.features)}
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Property Details */}

        <div className="ltn__shop-details-area pb-10">
          <Container>
            <Row>
              <Col lg={8} md={12}>
                <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-date">
                        <i className="far fa-calendar-alt"></i>
                        {new Date(property.createdAt).toLocaleDateString()}
                      </li>
                      <li>
               
                          <i className="far fa-comments"></i>
                          {/* {new Date(property.updatedAt).toLocaleDateString()} */}
                          
   
                      </li>
                    </ul>
                  </div>
                  <h1> {property.title}</h1>
                  <label>
                    <span className="ltn__secondary-color">
                      <i className="flaticon-pin"></i>
                    </span>{" "}
                    {property.country}
                  </label>
                  <h4 className="title-2">Property Description</h4>
                  <p>{property.description}</p>

                  <h4 className="title-2">Property Detail</h4>
                  <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                    <Row>
                      <Col lg={6} md={6}>
                        <ul>
                          <li>
                            <label>Property ID:</label>{" "}
                            {/* <span className="slug-property-items-style">{property._id}</span> */}
                          </li>
                          <li>
                            <label>Home Area: </label>{" "}
                            <span className="slug-property-items-style">{property.features.area} sqft</span>
                          </li>
                          <li>
                            <label>Rooms:</label>{" "}
                            <span className="slug-property-items-style">{property.features.rooms}</span>
                          </li>
                          <li>
                            <label>Bedroom</label>{" "}
                            <span className="slug-property-items-style">{bedrooms}
                            </span>
                          
                          </li>
                          <li>
                            <label>Year built:</label>{" "}
                 
                            <span className="slug-property-items-style">{bathrooms} </span>    
                          
                          </li>
                        </ul>
                      </Col>
                      <Col lg={6} md={6}>
                        {" "}
                        <ul>
                          <li>
                            <label>Lot Area:</label>{" "}
                            {/* <span>{property.propertyDetails.propertyId}</span> */}
                          </li>
                          <li>
                            <label>Lot dimensions:</label>{" "}
                            {/* <span>{property.propertyDetails.area} sqft</span> */}
                          </li>
                          <li>
                            <label>Beds:</label>{" "}
                            {/* <span>{property.propertyDetails.bedrooms}</span> */}
                          </li>
                          <li>
                            <label>Price:</label> <span className="slug-property-items-style">{property.price}</span>
                          </li>
                          <li>
                            <label>Property Status:</label>{" "}
                            <span className="slug-property-items-style">{type}</span>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <h1>{property.title}</h1>
        <p>{property.description}</p>
        <p>Price: ${property.price.toLocaleString()}</p>
        <p>State: {property.state}</p>
        <p>Country: {property.country}</p>
        <p>Address: {property.address}</p>
        <p>Zip Code: {property.zipCode}</p>
        <div className="">
          {/* <video src={property.video} width={200} height={400} controls /> */}
        </div>
        {/* Add other property details here */}
      </Container>
    </LayoutOne>
  );
};


export default PropertyDetail;
