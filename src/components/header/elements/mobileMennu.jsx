import Link from "next/link";
import {
  FaRegUser,
  FaRegHeart,
  FaShoppingCart,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaSearch,
} from "react-icons/fa";

import {
  getSiblings,
  getClosest,
  slideUp,
  slideDown,
  slideToggle,
} from "@/lib/product";
import { useSelector } from "react-redux";

const MobileMenu = function ({ offCanVastoggleBtn, closeSideBar }) {
  const { cartItems } = useSelector((state) => state.cart);

  const onClickHandler = (e) => {
    const target = e.currentTarget;
    const parentEl = target.parentElement;
    parentEl.classList.toggle("active");
    if (
      parentEl?.classList.contains("menu-expand") ||
      target.classList.contains("menu-expand")
    ) {
      const element = target.classList.contains("icon") ? parentEl : target;
      const parent = getClosest(element, "li");
      const childNodes = parent.childNodes;
      const parentSiblings = getSiblings(parent);
      parentSiblings.forEach((sibling) => {
        sibling.classList.remove("active");
        const sibChildNodes = sibling.childNodes;
        sibChildNodes.forEach((child) => {
          if (child.nodeName === "UL") {
            slideUp(child, 1000);
          }
        });
      });
      childNodes.forEach((child) => {
        if (child.nodeName === "UL") {
          slideToggle(child, 1000);
        }
      });
    }
  };

  return (
    <>
      <div
        id="ltn__utilize-mobile-menu"
        className={`ltn__utilize ltn__utilize-mobile-menu   ${
          offCanVastoggleBtn ? "ltn__utilize-open" : ""
        }`}
      >
        <div className="ltn__utilize-menu-inner ltn__scrollbar">
          <div className="ltn__utilize-menu-head">
            <div className="site-logo">
              <Link href="/">
                <img src="/img/logo.png" alt="Logo" />
              </Link>
            </div>
            <button onClick={closeSideBar} className="ltn__utilize-close">
              ×
            </button>
          </div>
          <div className="ltn__utilize-menu-search-form">
            <form action="#">
              <input type="text" placeholder="Search..." />
              <button>
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="ltn__utilize-menu">
            <ul>
              <li>
                <Link href="/">HOME</Link>
                {/* <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span> */}
              
              </li>
              <li>
                <Link href="/about">ABOUT</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="sub-menu">
                  <li>
                    <Link href="/history">HISTORY</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="">BUY</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="sub-menu">
                <li>
              <Link href="/france/sale">FRANCE</Link>
            </li>
            <li>
              <Link href="/united-states/sale">UNITED STATES</Link>
            </li>
            <li>
              <Link href="/italy/sale">ITALY</Link>
            </li>
            <li>
              <Link href="/spain/sale">SPAIN</Link>
            </li>
            <li>
              <Link href="/switzerland/sale">SWITZERLAND</Link>
            </li>
            <li>
              <Link href="/principality-of-monaco">PRINCIPALITY OF MONACO</Link>
            </li>
            <li>
              <Link href="/uae">UNITED ARAB OF EMIRATES</Link>
            </li>
            <li>
              <Link href="/portugal">PORTUGAL</Link>
            </li>
            <li>
              <Link href="/andorra">ANDORRA</Link>
            </li>
            <li>
              <Link href="/morroco">MORROCO</Link>
            </li>
                </ul>
              </li>
              <li>
                <Link href="#">RENT</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="sub-menu">
                <li>
              <Link href="#">HOLIDAYS </Link>
              <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
              <ul>
                <li>
                  <Link href="/france/seasonal-rental/">FRANCE</Link>
                </li>
                <li>
                  <Link href="/switzerland/seasonal-rental/">SWITZERLAND</Link>
                </li>
                <li>
                  <Link href="/spain/seasonal-rental/">SPAIN</Link>
                </li>
                <li>
                  <Link href="/portugal/seasonal-rental/">PORTUGAL</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="#">EVENTS</Link>
              <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
              <ul>
              <li>
                  <Link href="/france/event/">FRANCE</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="#">LONG TERM</Link>
              <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
              <ul>
              <li>
                  <Link href="/united-states/rental/">UNITED STATES</Link>
                </li>
                <li>
                  <Link href="/switzerland/rental/">SWITZERLAND</Link>
                </li>
                <li>
                  <Link href="/italy/rental/">ITALY</Link>
                </li>
                <li>
                  <Link href="/spain/rental/">SPAIN</Link>
                </li>
                <li>
                  <Link href="/uae/rental/">UNITED ARAB OF EMIRATES</Link>
                </li>
                <li>
                  <Link href="/principality-of-monaco/rental/">PRINCIPALITY OF MONACO</Link>
                </li>
                <li>
                  <Link href="/france/rental/">FRANCE</Link>
                </li>
                <li>
                  <Link href="/andorra/rental/">ANDORRA</Link>
                </li>
              </ul>
            </li>
                </ul>

                
              </li>
              <li>
                <Link href="#">SERVICES</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="sub-menu">
                  <li>
                    <Link href="/shop">PROPERTY</Link>
                  </li>
                  <li>
                    <Link href="/locations">GOOGLE MAP LOCATIONS</Link>
                  </li>
                </ul>
                
              </li>
              {/* <li>
                <Link href="#">News</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="sub-menu">
                  <li>
                    <Link href="/blog">News</Link>
                  </li>
                  <li>
                    <Link href="/blog/grid">News Grid</Link>
                  </li>
                  <li>
                    <Link href="/blog/left-sidebar">News Left sidebar</Link>
                  </li>
                  <li>
                    <Link href="/blog/right-sidebar">News Right sidebar</Link>
                  </li>
                </ul>
              </li> */}
              {/* <li>
                <Link href="#">Pages</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="sub-menu">
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/service">Services</Link>
                  </li>

                  <li>
                    <Link href="/portfolio">Portfolio</Link>
                  </li>
                  <li>
                    <Link href="/portfolio/page-two">Portfolio - 02</Link>
                  </li>

                  <li>
                    <Link href="/team">Team</Link>
                  </li>

                  <li>
                    <Link href="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link href="/history">History</Link>
                  </li>
                  <li>
                    <Link href="/add-listing">Add Listing</Link>
                  </li>
                  <li>
                    <Link href="/locations">Google Map Locations</Link>
                  </li>
                  <li>
                    <Link href="/404">404</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/coming-soon">Coming Soon</Link>
                  </li>
                </ul>
              </li> */}
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="ltn__utilize-buttons ltn__utilize-buttons-2">
            <ul>
              <li>
                <Link href="/my-account" title="My Account">
                  <span className="utilize-btn-icon">
                    <FaRegUser />
                  </span>
                  My Account
                </Link>
              </li>
              {/* <li>
                <Link href="/wishlist" title="Wishlist">
                  <span className="utilize-btn-icon">
                    <FaRegHeart />
                    {cartItems.length > 0 ? (
                      <sup>{cartItems.length}</sup>
                    ) : (
                      <sup>0</sup>
                    )}
                  </span>
                  Wishlist
                </Link>
              </li> */}
              {/* <li>
                <Link href="/cart" title="Shoping Cart">
                  <span className="utilize-btn-icon">
                    <FaShoppingCart />
                    {cartItems.length > 0 ? (
                      <sup>{cartItems.length}</sup>
                    ) : (
                      <sup>0</sup>
                    )}
                  </span>
                  Shoping Cart
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="ltn__social-media-2">
            <ul>
              <li>
                <Link href="#">
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaLinkedin />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaInstagram />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
