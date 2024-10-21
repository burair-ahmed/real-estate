// src/components/PropertyCard.js
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cart-slice";
import { useState } from "react";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/store/slices/wishlist-slice";
import QuickViewModal from "@/components/modals/quickViewModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaMapMarker, FaMapMarkerAlt, FaCamera, FaFilm } from "react-icons/fa";

const PropertyCard = ({ propertyData, wishlistItem }) => {
  // Log propertyData to check the structure and slug
  console.log("Property Data:", propertyData);

  // Check if slug exists
  if (!propertyData.slug) {
    console.error("Slug is undefined for property:", propertyData.title);
  }

  let badgeText = propertyData.propertytype 
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const wishListTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Wishlist
    </Tooltip>
  );

  const quickViewTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Quick View
    </Tooltip>
  );

  return (
    <>
      <div className="ltn__product-item ltn__product-item-4">
        <div className="product-img">
          <Link href={`/properties/${propertyData.slug}`}>
            <img
              src={propertyData.images[0] || "/img/default-image.jpg"}
              alt={`${propertyData.title}`}
              width={400}
              height={300}
            />
          </Link>
          <div className="product-badge">
            <ul>
              <li
                  className={`${propertyData.propertytype[0] ? "sale-badge" : ""} ${propertyData.propertytype[1] ? "rent-badge" : ""} ${propertyData.propertytype[2] ? "development-badge" : ""}`}
              >
                {badgeText}
              </li>
            </ul>
          </div>
          <div className="product-img-location-gallery">
            <div className="product-img-location">
              <ul>
                <li>
                  <Link href="/locations">
                    <i className="flaticon-pin"></i>
                    {propertyData.country}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="product-img-gallery">
              <ul>
                <li>
                  <Link
                    className="d-flex align-items-center justify-content-center"
                    href={`/properties/${propertyData.slug}`}
                  >
                    <FaCamera className="me-2" />
                    {propertyData.images.length}
                  </Link>
                </li>
                <li>
                  <Link
                    className="d-flex align-items-center justify-content-center"
                    href={`/properties/${propertyData.slug}`}
                  >
                    <FaFilm className="me-2" />
                    1
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="product-info">
        
        <div className="product-price">
            <span>
              {`AED ${propertyData.price}`}
              <label></label>
            </span>
          </div>
          <h2 className="product-title">
            <Link href={`/properties/${propertyData.slug}`}>{propertyData.title}</Link>
          </h2>
          <div className="product-description">
            <p>{propertyData.description}</p>
          </div>
          <ul className="ltn__list-item-2 ltn__list-item-2-before">
            <li>
              <span>
                {propertyData.features.bedrooms}
                <i className="flaticon-bed"></i>
              </span>
              Bedrooms
            </li>
            <li>
              <span>
                {propertyData.features.bathrooms}
                <i className="flaticon-clean"></i>
              </span>
              Bathrooms
            </li>
            <li>
              <span>
                {propertyData.features.area}
                <i className="flaticon-square-shape-design-interface-tool-symbol"></i>
              </span>
              square Ft
            </li>
          </ul>
          <div className="product-hover-action">
            <ul>
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={quickViewTooltip}
                >
                  <button onClick={() => setModalShow(true)}>
                    <i className="flaticon-expand"></i>
                  </button>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={wishListTooltip}
                >
                  <button
                    onClick={
                      wishlistItem !== undefined
                        ? () => dispatch(deleteFromWishlist(propertyData._id))
                        : () => dispatch(addToWishlist(propertyData))
                    }
                  >
                    <i className="flaticon-heart-1"></i>
                  </button>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <QuickViewModal
        productData={propertyData}
        show={modalShow}
        onHide={() => setModalShow(false)}
        slug={propertyData.slug} // Pass slug to the modal
      />
    </>
  );
};

export default PropertyCard;
