import Link from "next/link";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import { LayoutOne } from "@/layouts";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import TitleSection from "@/components/titleSection";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { productSlug } from "@/lib/product";
import {
    FaTrophy,
    FaAward,
    FaMedal,
} from "react-icons/fa";
import TitleSection2 from "@/components/titleSection/index2";


function HistoryPage() {

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

    return (
        <LayoutOne topbar={true}>
            <ShopBreadCrumb title="Our History" sectionPace="" currentSlug="History" />

            <div className="ltn__our-history-area pb-100">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <Tab.Container defaultActiveKey="first">
                                <div className="ltn__our-history-inner">
                                    <div className="ltn__tab-menu text-uppercase">
                                        <Nav>
                                            <Nav.Link eventKey="first">1900</Nav.Link>
                                            <Nav.Link eventKey="second">1940</Nav.Link>
                                            <Nav.Link eventKey="third">2000</Nav.Link>
                                            <Nav.Link eventKey="fourth">2010</Nav.Link>
                                            <Nav.Link eventKey="five">2021</Nav.Link>
                                        </Nav>
                                    </div>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <div className="ltn__product-tab-content-inner">
                                                <Row>
                                                    <Col xs={12} lg={6} className="align-self-center">
                                                        <div className="about-us-img-wrap about-img-left">
                                                            <img src="/img/img-slide/12.jpg" alt="Image" />
                                                            <div className="ltn__history-icon">
                                                                <FaAward />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={6} className="align-self-center">
                                                        <div className="about-us-info-wrap">
                                                            <div className="section-title-area">
                                                                <h6 className="section-subtitle2 section-subtitle-custom ltn__secondary-color">Our History</h6>
                                                                <h1 className="section-title2">We Started Our Journey</h1>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                                                            </div>

                                                            <p>Lorem ipsum dolor sit amet, consectetur adipis icing elit, sed do eius mod tempor incididunt ut labore et dolore magna aliqua. consectetur adipis icing elit, sed do eius mod t</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <div className="ltn__product-tab-content-inner">
                                                <Row>
                                                    <Col xs={12} lg={6} className="align-self-center">
                                                        <div className="about-us-img-wrap about-img-left">
                                                            <img src="/img/img-slide/11.jpg" alt="Image" />
                                                            <div className="ltn__history-icon">
                                                                <i className="icon-award"></i>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={6} className="align-self-center">
                                                        <div className="about-us-info-wrap">
                                                            <div className="section-title-area">
                                                                <h6 className="section-subtitle2 section-subtitle-custom ltn__secondary-color">Get rewards</h6>
                                                                <h1 className="section-title2">It Was An Sweet
                                                                    Journey Time</h1>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                                                            </div>

                                                            <p>Lorem ipsum dolor sit amet, consectetur adipis icing elit, sed do eius mod tempor incididunt ut labore et dolore magna aliqua. consectetur adipis icing elit, sed do eius mod t</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
                                            <div className="ltn__product-tab-content-inner">
                                                <Row>
                                                    <Col xs={12} lg={6} className="align-self-center">
                                                        <div className="about-us-img-wrap about-img-left">
                                                            <img src="/img/img-slide/13.jpg" alt="Image" />
                                                            <div className="ltn__history-icon">
                                                                <FaMedal />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={6} className="align-self-center">
                                                        <div className="about-us-info-wrap">
                                                            <div className="section-title-area">
                                                                <h6 className="section-subtitle2 section-subtitle-custom ltn__secondary-color">Get rewards</h6>
                                                                <h1 className="section-title2">It Was An Sweet
                                                                    Journey Time</h1>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                                                            </div>

                                                            <p>Lorem ipsum dolor sit amet, consectetur adipis icing elit, sed do eius mod tempor incididunt ut labore et dolore magna aliqua. consectetur adipis icing elit, sed do eius mod t</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="fourth">
                                            <div className="ltn__product-tab-content-inner">
                                                <Row>
                                                    <Col xs={12} lg={6} className="align-self-center">
                                                        <div className="about-us-img-wrap about-img-left">
                                                            <img src="/img/img-slide/12.jpg" alt="Image" />
                                                            <div className="ltn__history-icon">
                                                                <FaAward />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={6} className="align-self-center">
                                                        <div className="about-us-info-wrap">
                                                            <div className="section-title-area">
                                                                <h6 className="section-subtitle2 section-subtitle-custom ltn__secondary-color">Get rewards</h6>
                                                                <h1 className="section-title2">It Was An Sweet
                                                                    Journey Time</h1>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                                                            </div>

                                                            <p>Lorem ipsum dolor sit amet, consectetur adipis icing elit, sed do eius mod tempor incididunt ut labore et dolore magna aliqua. consectetur adipis icing elit, sed do eius mod t</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="five">
                                            <div className="ltn__product-tab-content-inner">
                                                <Row>
                                                    <Col xs={12} lg={6} className="align-self-center">
                                                        <div className="about-us-img-wrap about-img-left">
                                                            <img src="/img/img-slide/11.jpg" alt="Image" />
                                                            <div className="ltn__history-icon">
                                                                <FaTrophy />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={6} className="align-self-center">
                                                        <div className="about-us-info-wrap">
                                                            <div className="section-title-area">
                                                                <h6 className="section-subtitle2 section-subtitle-custom ltn__secondary-color">Get rewards</h6>
                                                                <h1 className="section-title2">It Was An Sweet
                                                                    Journey Time</h1>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                                                            </div>

                                                            <p>Lorem ipsum dolor sit amet, consectetur adipis icing elit, sed do eius mod tempor incididunt ut labore et dolore magna aliqua. consectetur adipis icing elit, sed do eius mod t</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </div>
                            </Tab.Container>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="ltn__feature-area section-bg-2 pt-115 pb-90">
    <Container>
        <Row>
            <Col xs={12}>
                <TitleSection2
                    sectionClasses="text-center"
                    headingClasses="section-subtitle-custom"
                    titleSectionData2={{
                        subTitle2: "Our Advantages",
                        title2: "Why Choose Our Real Estate Services",
                    }}
                />
            </Col>
        </Row>
        <Row className="justify-content-center">
            {/* Feature 1 */}
            <Col xs={12} sm={6} xl={4}>
                <div className="ltn__feature-item ltn__feature-item-7 ltn__feature-item-7-color-white">
                    <div className="ltn__feature-icon-title">
                        <div className="ltn__feature-icon">
                            <span><i className="flaticon-house-4"></i></span>
                        </div>
                        <h3 className="animated fadeIn"><Link href="/service/premium-properties">Premium Property Selection</Link></h3>
                    </div>
                    <div className="ltn__feature-info">
                        <p>Discover a curated selection of luxurious homes, apartments, and villas tailored to meet your high standards and unique lifestyle.</p>
                    </div>
                </div>
            </Col>
            {/* Feature 2 */}
            <Col xs={12} sm={6} xl={4}>
                <div className="ltn__feature-item ltn__feature-item-7 ltn__feature-item-7-color-white">
                    <div className="ltn__feature-icon-title">
                        <div className="ltn__feature-icon">
                            <span><i className="icon-mechanic"></i></span>
                        </div>
                        <h3 className="animated fadeIn"><Link href="/service/global-architects">Expert Architectural Insights</Link></h3>
                    </div>
                    <div className="ltn__feature-info">
                        <p>Work with top architects and designers who ensure each property is crafted with exceptional design and functionality.</p>
                    </div>
                </div>
            </Col>
            {/* Feature 3 */}
            <Col xs={12} sm={6} xl={4}>
                <div className="ltn__feature-item ltn__feature-item-7 ltn__feature-item-7-color-white">
                    <div className="ltn__feature-icon-title">
                        <div className="ltn__feature-icon">
                            <span><i className="icon-repair-1"></i></span>
                        </div>
                        <h3 className="animated fadeIn"><Link href="/service/unique-amenities">Tailored Living Spaces</Link></h3>
                    </div>
                    <div className="ltn__feature-info">
                        <p>Enjoy exclusive amenities like built-in storage, custom closets, and optimized space solutions that make every home functional and stylish.</p>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
</div>



            <div className="call-to-action-area call-to-action-5 bg-image bg-overlay-theme-90 pt-40 pb-25" style={{ backgroundImage: `url("../img/bg/13.jpg")` }}>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div className="call-to-action-inner call-to-action-inner-5 text-decoration text-center">
                                <h2 className="white-color">24/7 Availability, Make <Link className="appointment-class" href="#">An Appointment</Link></h2>
                            </div>
                        </Col>
                    </Row>
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
    );
}

export default HistoryPage;