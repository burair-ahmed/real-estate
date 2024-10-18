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

const PropertyCard = ({ propertyData, wishlistItem }) => {
  // Log propertyData to check the structure and slug
  console.log("Property Data:", propertyData);

  // Check if slug exists
  if (!propertyData.slug) {
    console.error("Slug is undefined for property:", propertyData.title);
  }

  let badgeText = propertyData.propertytype.includes("Rent")
    ? "For Rent"
    : "For Sale";
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
      <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5">
        <div className="product-img">
          <Link href={`/properties/${propertyData.slug}`}>
            <img
              src={propertyData.images[0] || "/img/default-image.jpg"}
              alt={`${propertyData.title}`}
              width={400}
              height={300}
            />
          </Link>
        </div>
        <div className="product-info">
          <div className="product-badge">
            <ul>
              <li
                className={`${propertyData.propertytype ? "sale-badge" : ""}`}
              >
                {badgeText}
              </li>
            </ul>
          </div>
          <div className="product-price">
            <span>AED{propertyData.price}</span>
          </div>
          <h2 className="product-title">
            <Link href={`/properties/${propertyData.slug}`}>
              {propertyData.title}
            </Link>
          </h2>
          <ul className="ltn__plot-brief">
            <li>
              <span>{propertyData.features.bedrooms}</span>
              <span className="ms-1">Bedrooms</span>
            </li>
            <li>
              <span>{propertyData.features.bathrooms}</span>
              <span className="ms-1">Bathrooms</span>
            </li>
            <li>
              <span>{propertyData.features.area}</span>
              <span className="ms-1">sq ft</span>
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
