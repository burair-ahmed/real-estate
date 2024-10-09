import Link from "next/link";
import { FaPlus, FaAngleDoubleRight } from "react-icons/fa";
const MenuList = ({ addListing }) => {
  return (
    <ul>
      <li className="menu-icon">
        <Link href="/">
          HOME 
          {/* <FaPlus /> */}
        </Link>
      </li>
      <li className="menu-icon">
        <Link href="/about">
          ABOUT <FaPlus />
        </Link>
          <ul>
            <li>
              <Link href="/history">History</Link>
            </li>
          </ul>
      </li>
      <li className="menu-icon">
        <Link href="">
          BUY <FaPlus />
        </Link>
          <ul>
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
      <li className="menu-icon">
        <Link href="">
          RENT <FaPlus />
        </Link>
          <ul>
          <li>
              <Link href="#">HOLIDAYS</Link>
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
              <ul>
              <li>
                  <Link href="/france/event/">FRANCE</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="#">LONG TERM</Link>
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
      <li className="menu-icon">
        <Link href="/service">
          SERVICES <FaPlus />
        </Link>
        <ul>
        <li>
            <Link href="/shop">Property</Link>
          </li>
          <li>
            <Link href="/locations">Google Map Locations</Link>
          </li>
        </ul>
      </li>

      {/* <li className="menu-icon mega-menu-parent">
        <Link href="#">
          Pages <FaPlus />
        </Link>
        <ul className="mega-menu mega-menu column-4">
          <li>
            <Link href="#">Inner Pages</Link>
            <ul>
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
            </ul>
          </li>
          <li>
            <Link href="#">Inner Pages</Link>
            <ul>
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
          </li>
          <li>
            <Link href="#">Property Pages</Link>
            <ul>
              <li>
                <Link href="/shop">Property</Link>
              </li>
              <li>
                <Link href="/shop/left-sidebar">Property Left sidebar</Link>
              </li>
              <li>
                <Link href="/shop/right-sidebar">Property right sidebar</Link>
              </li>
              <li>
                <Link href="/shop/grid">Property Grid</Link>
              </li>
              <li>
                <Link href="/shop/list">Property List</Link>
              </li>

              <li>
                <Link href="/cart">Cart</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/shop">
              <img src="/img/banner/menu-banner-1.jpg" alt="#" />
            </Link>
          </li>
        </ul>
      </li> */}
      <li>
        <Link href="/contact">CONTACT</Link>
      </li>

      {addListing ? (
        <li className="special-link">
          <Link href="/add-listing">Add Listing</Link>
        </li>
      ) : null}
    </ul>
  );
};

export default MenuList;
