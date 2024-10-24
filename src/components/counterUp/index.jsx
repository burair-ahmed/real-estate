import { useState } from "react";
import CountUp from "react-countup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { VisibilityObserver } from "reactjs-visibility";
import Slider from "react-slick";


function CounterUp() {
  const [loading, setLoading] = useState(false);

  const onVisibilityChange = (isVisible) => {
    if (isVisible) {
      setLoading(true);
    }
  };

  const options = {
    rootMargin: "200px",
  };

  // Slider settings for responsive behavior
  const sliderSettings = {
    dots: true, // Show dots for navigation
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 slides at a time for larger screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 slides for screens <= 1024px
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 slides for screens <= 768px
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1, // Show 1 slide for mobile devices
        },
      },
    ],
  };

  return (
    <div className="ltn__counterup-area section-bg-1 pt-120 pb-70">
      <Container>
        <Slider {...sliderSettings}>
          <Col className="align-self-center">
            <div className="ltn__counterup-item">
              <div className="counter-icon">
                <i className="flaticon-select"></i>
              </div>
              <h1>
                <VisibilityObserver
                  onChangeVisibility={onVisibilityChange}
                  options={options}
                >
                  <CountUp
                    className="count-text"
                    start={0}
                    end={loading ? 25 : 0}
                    suffix="+"
                    duration={5}
                  />
                </VisibilityObserver>
              </h1>
              <h6>Total Area Sq</h6>
            </div>
          </Col>

          <Col className="align-self-center">
            <div className="ltn__counterup-item">
              <div className="counter-icon">
                <i className="flaticon-office"></i>
              </div>
              <h1>
                <VisibilityObserver
                  onChangeVisibility={onVisibilityChange}
                  options={options}
                >
                  <CountUp
                    className="count-text"
                    start={0}
                    end={loading ? 25 : 0}
                    suffix="K+"
                    duration={5}
                  />
                </VisibilityObserver>
              </h1>
              <h6>Apartments Sold</h6>
            </div>
          </Col>

          <Col className="align-self-center">
            <div className="ltn__counterup-item">
              <div className="counter-icon">
                <i className="flaticon-excavator"></i>
              </div>
              <h1>
                <VisibilityObserver
                  onChangeVisibility={onVisibilityChange}
                  options={options}
                >
                  <CountUp
                    className="count-text"
                    start={0}
                    end={loading ? 25 : 0}
                    suffix="+"
                    duration={5}
                  />
                </VisibilityObserver>
              </h1>
              <h6>Total Constructions</h6>
            </div>
          </Col>

          <Col className="align-self-center">
            <div className="ltn__counterup-item">
              <div className="counter-icon">
                <i className="flaticon-armchair"></i>
              </div>
              <h1>
                <VisibilityObserver
                  onChangeVisibility={onVisibilityChange}
                  options={options}
                >
                  <CountUp
                    className="count-text"
                    start={0}
                    end={loading ? 25 : 0}
                    suffix="+"
                    duration={5}
                  />
                </VisibilityObserver>
              </h1>
              <h6>Apartio Rooms</h6>
            </div>
          </Col>
        </Slider>
      </Container>
    </div>
  );
}

export default CounterUp;
