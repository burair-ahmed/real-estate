import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { FaHome, FaAngleRight } from "react-icons/fa";

const ShopBreadCrumb = ({ title, currentSlug, sectionPace, bgImage }) => {
  return (
    <>
      <div
        className={`ltn__breadcrumb-area text-center bg-overlay-white-60 bg-image ${sectionPace}`}
        style={{ backgroundImage: `url("${bgImage}")` }}
      >
        <Container>
          <Row>
            <Col xs={12}>
              <div className="ltn__breadcrumb-inner">
                <h1 className="page-title">{title}</h1>
                <div className="ltn__breadcrumb-list">
                  <ul>
                    <li>
                      <Link href="/">
                        <span className="ltn__secondary-color">
                          <FaHome className="me-2" />
                        </span>
                        <span className="me-2">Home</span>
                        <FaAngleRight />
                      </Link>
                    </li>
                    <li>{currentSlug}</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ShopBreadCrumb;
