import path from "path";
import fs from "fs/promises";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProducts, productSlug, getDiscountPrice } from "@/lib/product";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { LayoutOne } from "@/layouts";
import HeroSectionStyleOne from "@/components/hero/styleOne";
import CarDealerSearchForm from "@/components/SearchForm";
import AboutUsStyleOne from "@/components/aboutUs/aboutUsStyleOne";
import AboutUsStyleTwo from "@/components/aboutUs/aboutUsStyleTwo";
import CounterUp from "@/components/counterUp";
import Feature from "@/components/features";
import TitleSection from "@/components/titleSection";
import PropertyCard from "@/components/PropertyCard"; // Adjust the import as needed
import CallToAction from "@/components/callToAction";
import VideoBanner from "@/components/banner/videoBanner";
import aminitiesData from "@/data/aminities/index.json";
import AminitiesItem from "@/components/aminities/item";
import TestimonialCarouselItem from "@/components/testimonialCarousel";
import testimonialData from "@/data/testimonial";
import featuresData from "@/data/service";
import TitleSection2 from "@/components/titleSection/index2";
import MyHero from "@/components/hero/myhero";
import Head from 'next/head';


function HomePage(props) {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/listings");
      const data = await response.json();
      console.log("Fetched Properties:", data);
      console.log("Number of properties:", data.length);

      // Check for duplicates
      const duplicates = data.filter((property, index, self) =>
        index !== self.findIndex((p) => p.slug === property.slug)
      );
      console.log("Duplicate Properties:", duplicates);

      // Remove duplicates
      const uniqueProperties = Array.from(
        new Map(data.map(property => [property.slug, property])).values()
      );

      setProperties(uniqueProperties);
      console.log("Unique Properties Set:", uniqueProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const { products } = useSelector((state) => state.product);
  const featuredProducts = getProducts(products, "buying", "featured", 5);
  const featureData = getProducts(featuresData, "buying", "featured", 3);
  const { Herodata } = props;

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
  const propertyCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(properties.length, 3), // Adjust to available properties
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1799,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const testiMonialsettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  return (
    <>
     <Head>
        <title>Prairies Hills - Luxury Real Estate</title>
        <meta property="og:title" content="Prairies Hills - Luxury Real Estate" />
        <meta property="og:description" content="Prairies Hills: Your partner for effortless luxury real estate in Dubai" />
        <meta property="og:image" content="/img/og-logo.png" />
        <meta property="og:url" content="https://prairies-hills.vercel.app/" />
        <meta property="og:type" content="website" />
      </Head>
      <LayoutOne topbar={true}>
        <MyHero/>
        {/* <HeroSectionStyleOne data={Herodata} /> */}
        {/* <CarDealerSearchForm navMenuClass="d-none" customClasses="" /> */}
        <AboutUsStyleOne sectionSpace="pt-120 pb-90" />
        <CounterUp />
        <AboutUsStyleTwo sectionSpace="pt-120 pb-90" />
        <Feature
          classes="section-bg-1"
          servicebtn={true}
          iconTag={false}
          data={featureData}
          headingClasses="section-subtitle-2"
          titleSectionData={{
            sectionClasses: "text-center",
            subTitle: "Our Services",
            title: "Our Main Focus",
          }}
        />
        {/* PROPERTY SLIDER AREA START */}
        <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90 plr--7">
          <Container fluid>
            <Row>
              <Col lg={12}>
                <TitleSection2
                  sectionClasses="text-center"
                  headingClasses="section-subtitle-custom"
                  titleSectionData2={{
                    subTitle2: "Properties",
                    title2: "Featured Listings",
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                {!!properties.length ? (
                  <Slider
                    {...propertyCarouselSettings}
                    className="ltn__product-slider-item-four-active-full-width slick-arrow-1"
                  >
                    {properties.map((property) => (
                      <PropertyCard
                        key={property.slug} // Ensure this is unique
                        propertyData={property}
                        wishlistItem={null} // Pass your wishlist item logic here
                      />
                    ))}
                  </Slider>
                ) : (
                  <p>No properties available</p>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        {/* PROPERTY SLIDER AREA END */}
        <div className="ltn__apartments-plan-area pb-70">
          <Container>
            <Row>
              <Col>
                <TitleSection2
                  sectionClasses="text-center"
                  headingClasses="section-subtitle-custom"
                  titleSectionData2={{
                    subTitle2: "Apartment Sketch",
                    title2: "Apartments Plan",
                    additionalClassName: "",
                  }}
                />
                <Tab.Container defaultActiveKey="first">
                  <div className="ltn__tab-menu ltn__tab-menu-3 text-center">
                    <Nav className="nav justify-content-center">
                      <Nav.Link eventKey="first">The Studio</Nav.Link>
                      <Nav.Link eventKey="second">Deluxe Portion</Nav.Link>
                      <Nav.Link eventKey="third">Penthouse</Nav.Link>
                      <Nav.Link eventKey="fourth">Top Garden</Nav.Link>
                      <Nav.Link eventKey="five"> Double Height</Nav.Link>
                    </Nav>
                  </div>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div className="ltn__apartments-tab-content-inner">
                        <Row>
                          <Col xs={12} lg={6}>
                            <div className="apartments-plan-info ltn__secondary-bg text-color-white">
                              <h2>The Studio</h2>
                              <p>
                                Discover modern living at its finest in The
                                Studio, a thoughtfully designed space that
                                offers 2800 sq. ft. of stylish comfort. This
                                chic residence includes a cozy 150 sq. ft.
                                bedroom, a contemporary 45 sq. ft. bathroom, and
                                a spacious 650 sq. ft. lounge, perfect for both
                                work and relaxation. The pet-friendly balcony
                                offers a peaceful outdoor retreat, adding to the
                                charm of this sophisticated studio. Whether
                                you&apos;re looking for a creative haven or a
                                luxurious sanctuary, The Studio provides a
                                perfect balance of functionality and elegance
                                for the modern lifestyle.
                              </p>
                              <div className="apartments-info-list apartments-info-list-color mt-40">
                                <ul>
                                  <li>
                                    <label>Total Area</label>
                                    <span>2800 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Bedroom</label>
                                    <span>150 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Bathroom</label>
                                    <span>45 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Belcony/Pets</label>
                                    <span>Allowed</span>
                                  </li>
                                  <li>
                                    <label>Lounge</label>
                                    <span>650 Sq. Ft</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col xs={12} lg={6}>
                            <div className="apartments-plan-img">
                              <img src="/img/others/10.1.png" alt="#" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div className="ltn__product-tab-content-inner">
                        <Row>
                          <Col xs={12} lg={6}>
                            <div className="apartments-plan-info ltn__secondary-bg text-color-white">
                              <h2>Deluxe Portion</h2>
                              <p>
                                Experience the epitome of luxury living with
                                this stunning deluxe portion, designed to offer
                                comfort and elegance in every corner. Spanning
                                across 2800 sq. ft., this spacious residence
                                boasts a beautifully crafted 150 sq. ft.
                                bedroom, a modern 45 sq. ft. bathroom, and a
                                relaxing lounge perfect for unwinding. With a
                                pet-friendly balcony to enjoy fresh air, this
                                home provides a serene escape while offering all
                                the essentials for a contemporary lifestyle.
                                Discover a harmonious blend of sophistication
                                and convenience, making it an ideal choice for
                                those who seek refined living.
                              </p>
                              <div className="apartments-info-list apartments-info-list-color mt-40">
                                <ul>
                                  <li>
                                    <label>Total Area</label>
                                    <span>2800 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Bedroom</label>
                                    <span>150 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Bathroom</label>
                                    <span>45 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Belcony/Pets</label>
                                    <span>Allowed</span>
                                  </li>
                                  <li>
                                    <label>Lounge</label>
                                    <span>650 Sq. Ft</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col xs={12} lg={6}>
                            <div className="apartments-plan-img">
                              <img src="/img/others/10.png" alt="#" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <div className="ltn__product-tab-content-inner">
                        <Row>
                          <Col xs={12} lg={6}>
                            <div className="apartments-plan-info ltn__secondary-bg text-color-white">
                              <h2>Penthouse</h2>
                              <p>
                                Indulge in the ultimate luxury with this
                                magnificent penthouse, where modern elegance
                                meets expansive living. Covering a grand total
                                of 2800 sq. ft., this exquisite space features a
                                generously sized 150 sq. ft. bedroom, a sleek 45
                                sq. ft. bathroom, and a stunning 650 sq. ft.
                                lounge perfect for entertaining or relaxing. The
                                pet-friendly balcony offers breathtaking views,
                                providing the perfect setting for tranquil
                                moments. Designed for those who appreciate the
                                finer things in life, this penthouse delivers a
                                sophisticated and lavish lifestyle.
                              </p>
                              <div className="apartments-info-list apartments-info-list-color mt-40">
                                <ul>
                                  <li>
                                    <label>Total Area</label>
                                    <span>2800 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Bedroom</label>
                                    <span>150 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Bathroom</label>
                                    <span>45 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Belcony/Pets</label>
                                    <span>Allowed</span>
                                  </li>
                                  <li>
                                    <label>Lounge</label>
                                    <span>650 Sq. Ft</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col xs={12} lg={6}>
                            <div className="apartments-plan-img">
                              <img src="/img/others/10.1.png" alt="#" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      <div className="ltn__product-tab-content-inner">
                        <Row>
                          <Col xs={12} lg={6}>
                            <div className="apartments-plan-info ltn__secondary-bg text-color-white">
                              <h2>Top Garden</h2>
                              <p>
                                Step into serene luxury with this exquisite Top
                                Garden residence, offering 2800 sq. ft. of
                                refined living space. This elegant home features
                                a spacious 150 sq. ft. bedroom, a modern 45 sq.
                                ft. bathroom, and a grand 650 sq. ft. lounge,
                                perfect for relaxing or hosting guests. The
                                pet-friendly balcony invites you to enjoy
                                peaceful moments surrounded by nature, blending
                                outdoor beauty with indoor comfort. Crafted to
                                meet the highest standards of living, this
                                garden oasis offers a harmonious balance of
                                sophistication and tranquility, ideal for those
                                who seek a peaceful retreat.
                              </p>
                              <div className="apartments-info-list apartments-info-list-color mt-40">
                                <ul>
                                  <li>
                                    <label>Total Area</label>
                                    <span>2800 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Bedroom</label>
                                    <span>150 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Bathroom</label>
                                    <span>45 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Belcony/Pets</label>
                                    <span>Allowed</span>
                                  </li>
                                  <li>
                                    <label>Lounge</label>
                                    <span>650 Sq. Ft</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col xs={12} lg={6}>
                            <div className="apartments-plan-img">
                              <img src="/img/others/10.png" alt="#" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="five">
                      <div className="ltn__product-tab-content-inner">
                        <Row>
                          <Col xs={12} lg={6}>
                            <div className="apartments-plan-info ltn__secondary-bg text-color-white">
                              <h2>Double Height</h2>
                              <p>
                                Immerse yourself in luxury with this stunning
                                Double Height residence, designed to elevate
                                your living experience. Spanning 2800 sq. ft.,
                                this remarkable home offers a 150 sq. ft.
                                bedroom, a stylish 45 sq. ft. bathroom, and a
                                spacious 650 sq. ft. lounge, perfect for
                                relaxation or entertaining. The striking
                                double-height ceilings create an airy, open
                                atmosphere, while the pet-friendly balcony
                                provides a peaceful outdoor escape. Blending
                                modern sophistication with architectural
                                elegance, this residence promises an unmatched
                                living experience for those who appreciate
                                space, light, and style.
                              </p>
                              <div className="apartments-info-list apartments-info-list-color mt-40">
                                <ul>
                                  <li>
                                    <label>Total Area</label>
                                    <span>2800 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Bedroom</label>
                                    <span>150 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Bathroom</label>
                                    <span>45 Sq. Ft</span>
                                  </li>
                                  <li>
                                    <label>Belcony/Pets</label>
                                    <span>Allowed</span>
                                  </li>
                                  <li>
                                    <label>Lounge</label>
                                    <span>650 Sq. Ft</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col xs={12} lg={6}>
                            <div className="apartments-plan-img">
                              <img src="/img/others/10.1.png" alt="#" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- VIDEO AREA START --> */}
        {/* <div className="ltn__video-popup-area">
          <VideoBanner />
        </div> */}

        {/* <!-- TESTIMONIAL AREA START (testimonial-7) -->  */}
        <div
          className="ltn__testimonial-area bg-image-top pt-115 pb-70"
          style={{ backgroundImage: `url("../img/bg/20.jpg")` }}
        >
          <Container>
            <Row>
              <Col lg={12}>
                <TitleSection
                  sectionClasses="text-center"
                  headingClasses="section-subtitle-2"
                  titleSectionData={{
                    subTitle: "Our Testimonial",
                    title: "Clients Feedback",
                  }}
                />
              </Col>
            </Row>
            <Slider
              {...testiMonialsettings}
              className="ltn__testimonial-slider-5-active slick-arrow-1"
            >
              {testimonialData.map((data, key) => {
                return <TestimonialCarouselItem key={key} data={data} />;
              })}
            </Slider>
          </Container>
        </div>
        <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
          <Container>
            <Row>
              <Col xs={12}>
                <CallToAction />
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
    </>
  );
}
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "src/data/hero/", "index.json");
  const Herodata = JSON.parse(await fs.readFile(filePath));

  return {
    props: {
      Herodata,
    },
  };
}

export default HomePage;
