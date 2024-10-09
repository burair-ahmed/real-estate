import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import { useState } from "react";
import Image from 'next/image';

function AboutUsStyleOne({ sectionSpace }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="X7R-q9rsrtU"
        onClose={() => setOpen(false)}
      />
      <div className={`ltn__about-us-area ${sectionSpace}`}>
        <Container>
          <Row>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-img-wrap about-img-left">
                <Image src="/img/others/Untitled-4.jpg" alt="About Us Image" width={570} height={720} />
                <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
                  <div className="ltn__video-img ltn__animation-pulse1">
                    <Image src="/img/others/Untitled-1.jpg" alt="video popup bg image" width={300} height={225} />
                    <button
                      onClick={() => setOpen(true)}
                      className="ltn__video-icon-2"
                    >
                      <FaPlay />
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area mb-20">
                  <h6 className="section-subtitle2 section-subtitle-custom ltn__secondary-color">
                    About Us
                  </h6>
                  <h1 className="section-title2">
                    The Leading Real Estate Rental Marketplace<span>.</span>
                  </h1>
                  <p>
                  Welcome to Prairies Hills, Dubai&apos;s leading luxury real estate management company. We specialize in high-end property sales and rentals, offering tailored services to meet the needs of our elite clientele. Our expert team ensures seamless transactions and exceptional investment opportunities. Discover your dream home or next investment with us today!
                  </p>
                </div>
                <ul className="ltn__list-item-half clearfix">
                  <li>
                    <i className="flaticon-home-2"></i>
                    Smart Home Design
                  </li>
                  <li>
                    <i className="flaticon-mountain"></i>
                    Beautiful Scene Around
                  </li>
                  <li>
                    <i className="flaticon-heart"></i>
                    Exceptional Lifestyle
                  </li>
                  <li>
                    <i className="flaticon-secure"></i>
                    Complete 24/7 Security
                  </li>
                </ul>
                <div className="ltn__callout bg-overlay-theme-05  mt-30">
                  <p>
                  Your dream property is just a step away—let us help you find it.
                  </p>
                </div>
                <div className="btn-wrapper animated">
                  <Link
                    href="/service"
                    className="theme-btn-1 btn btn-effect-1"
                  >
                    OUR SERVICES
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUsStyleOne;
