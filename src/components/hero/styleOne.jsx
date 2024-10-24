import { useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import ModalVideo from "react-modal-video";
import { FaPlay, FaHome, FaArrowRight, FaArrowLeft } from "react-icons/fa";

function HeroSectionStyleOne({ data }) {
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

  // Add responsive settings to disable arrows on mobile
  const Herosettings = {
    dots: true,
    fade: true,
    cssEase: "linear",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 768, // Target screens below 768px width
        settings: {
          arrows: false, // Disable arrows on mobile
        },
      },
    ],
  };

  const [isOpen, setOpen] = useState(false);
  
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="HnbMYzdjuBs"
        onClose={() => setOpen(false)}
      />

      <div className="ltn__slider-area ltn__slider-3  section-bg-1">
        <Slider
          {...Herosettings}
          className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1"
        >
          {data.map((item, key) => (
            <div
              className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal ltn__slide-item-3 position-relative"
              key={key}
            >
              <div
                className={`ltn__slide-item-inner ${
                  item.variationLeft ? "text-right text-end" : ""
                }`}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 align-self-center">
                      <div className="slide-item-info">
                        <div className="slide-item-info-inner ltn__slide-animation">
                          <h6 className="slide-sub-title animated">
                            <span>
                              <FaHome />
                            </span>
                            {item.subtitle}
                          </h6>
                          <h1 className="slide-title animated">{item.Title}</h1>
                          <h1 className="slide-title animated">{item.Title2}</h1>
                          <div className="slide-brief animated">
                            <p>{item.Desc}</p>
                          </div>
                          <div className="btn-wrapper animated">
                            <Link
                              href="/about"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              {item.buttonText}
                            </Link>

                            {item.videoButton ? (
                              <button
                                onClick={() => setOpen(true)}
                                className="ltn__video-play-btn bg-white"
                              >
                                <FaPlay className="icon-play  ltn__secondary-color" />
                              </button>
                            ) : (
                              <Link
                                href="/about"
                                className="btn btn-transparent btn-effect-3"
                              >
                                {item.learnMoreButtonText}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`slide-item-img ${
                          item.variationLeft ? "slide-img-left" : ""
                        }`}
                      >
                        <img src={item.heroimage} alt="#" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default HeroSectionStyleOne;
