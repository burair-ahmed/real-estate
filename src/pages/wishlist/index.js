import { useState } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LayoutOne } from "@/layouts";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import { useDispatch, useSelector } from "react-redux";
import { productSlug, getDiscountPrice } from "@/lib/product";
import { addToCart } from "@/store/slices/cart-slice";
import { deleteFromWishlist } from "@/store/slices/wishlist-slice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [quantityCount] = useState(1);
  let cartTotalPrice = 0;

  return (
    <>
      <LayoutOne topbar={true}>
        {/* <!-- BREADCRUMB AREA START --> */}
        <ShopBreadCrumb
          title="Wishlist"
          sectionPace=""
          currentSlug="wishlist"
        />
        {/* <!-- BREADCRUMB AREA END --> */}

        {/* <!-- WISHLIST AREA START --> */}
        <div className="liton__wishlist-area mb-105">
          <Container>
            {wishlistItems && wishlistItems.length >= 1 ? (
              <Row>
                <Col lg={12}>
                  <div className="shoping-cart-inner">
                    <div className="shoping-cart-table table-responsive">
                      <table className="table">
                        <tbody>
                          {wishlistItems.map((propertyData, key) => {
                            const slug = productSlug(propertyData.slug);
                            const discountedPrice = getDiscountPrice(
                             propertyData.price
                            ).toFixed(2);
                            return (
                              <tr key={key}>
                                <td className="cart-product-remove">
                                  <span
                                    onClick={() =>
                                      dispatch(deleteFromWishlist(product.id))
                                    }
                                  >
                                    x
                                  </span>
                                </td>
                                <td className="cart-product-image">
                                  <Link href={`/properties/${slug}`}>
                                    <img
                                      src={propertyData.images[0]} // Fetching image from product data
                                      alt={propertyData.title}
                                      style={{ width: '100px', height: 'auto' }}
                                    />
                                  </Link>
                                </td>
                                <td className="cart-product-info">
                                  <h4>
                                    <Link href={`/properties/${propertyData.slug}`}>
                                      {propertyData.title}
                                    </Link>
                                  </h4>
                                </td>
                                <td className="cart-product-add-cart">
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Col>
              </Row>
            ) : (
              <div className="text-center">
                <p>No items found in wishlist</p>
                <Link href="/shop" className="theme-btn-1 btn btn-effect-1">
                  Shop Now
                </Link>
              </div>
            )}
          </Container>
        </div>
        {/* <!-- WISHLIST AREA END --> */}

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
};

export default Wishlist;
