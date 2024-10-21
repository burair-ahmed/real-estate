import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Lightbox from "yet-another-react-lightbox";
import PhotoAlbum from "react-photo-album";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Image from 'next/image';


function AboutUsStyleTwo({ sectionSpace }) {
  const [index, setIndex] = useState(-1);

  const slides = [
    {
      src: "/img/img-slide/Untitled-3.jpg",
      width: 800,
      height: 570,
    },
    {
      src: "/img/img-slide/Untitled-3.jpg",
      width: 800,
      height: 570,
    },
    {
      src: "/img/img-slide/Untitled-3.jpg",
      width: 800,
      height: 570,
    },
  ];

  return (
    <>
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom, Counter, Fullscreen, Download]}
      />

      <div className={`ltn__about-us-area ${sectionSpace}`}>
        <Container>
          <Row>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2--- mb-30">
                  <h6 className="section-subtitle2 section-subtitle-custom ltn__secondary-color">
                    Featured Property
                  </h6>
                  <h1 className="section-title2">Properties Sold Today</h1>
                  <p>
                    Praieries Hills allows you to design unlimited panels and real estate
                    custom forms to capture leads and keep record of all
                    information
                  </p>
                </div>
                <ul className="ltn__list-item-1 ltn__list-item-1-before clearfix">
                  <li> Live Music Cocerts at Luviana</li>
                  <li>Our SecretIsland Boat Tour is Just for You</li>
                  <li>Live Music Cocerts at Luviana</li>
                  <li>Live Music Cocerts at Luviana</li>
                </ul>
                <ul className="ltn__list-item-2 ltn__list-item-2-before ltn__flat-info">
                  <li>
                    <span>
                      3 <i className="flaticon-bed"></i>
                    </span>
                    Bedrooms
                  </li>
                  <li>
                    <span>
                      2 <i className="flaticon-clean"></i>
                    </span>
                    Bathrooms
                  </li>
                  <li>
                    <span>
                      2 <i className="flaticon-car"></i>
                    </span>
                    Car parking
                  </li>
                  <li>
                    <span>
                      3450
                      <i className="flaticon-square-shape-design-interface-tool-symbol"></i>
                    </span>
                    square Ft
                  </li>
                </ul>

                <div className="ltn__list-item-2 ltn__list-item-2-img mb-50">
                  <PhotoAlbum
                    layout="rows"
                    photos={slides}
                    targetRowHeight={150}
                    onClick={({ index: current }) => setIndex(current)}
                  />
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-img-wrap about-img-right">
                <Image src="/img/others/Untitled-3.jpg" alt="About Us Image" width={510} height={570} className="mt-14" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUsStyleTwo;
