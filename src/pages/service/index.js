import { LayoutOne } from "@/layouts";
import { Container, Row, Col } from "react-bootstrap";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Slider from "react-slick";
import { getProducts, productSlug } from "@/lib/product";
import TitleSection from "@/components/titleSection";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import AboutUsStyletwo from "@/components/aboutUs/aboutUsStyleTwo";
import Feature from "@/components/features";
import featureData from "@/data/service"

function Service() {
  const services = getProducts(featureData, "buying", "featured", 6);
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
    <>
      <LayoutOne topbar={true}>
        <ShopBreadCrumb
          title="What We Do"
          sectionPace=""
          currentSlug="Service"
          bgImage="/img/bg/14.jpg"
        />

        <AboutUsStyletwo sectionSpace="pb-90" />

        <Feature
          classes="section-bg-1"
          servicebtn={false}
          iconTag={true}
          headingClasses="section-subtitle-2"
          data={services}
          titleSectionData={{
            sectionClasses: "text-center",
            subTitle: "Our Services",
            title: "Our Core Services",
          }}
        />
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

export default Service;
