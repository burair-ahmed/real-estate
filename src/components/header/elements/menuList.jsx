import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const MenuList = ({ addListing }) => {
  return (
    <ul>
      <li className="menu-icon">
        <Link href="/">
          HOME
        </Link>
      </li>
      <li className="menu-icon">
        <Link href="">
          BUY <FaPlus />
        </Link>
        <ul>
          <li>
            <Link href="/uae">UNITED ARAB OF EMIRATES</Link>
          </li>
          <li>
            <Link href="/pakistan">PAKISTAN</Link>
          </li>
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
                <Link href="/uae">UNITED ARAB OF EMIRATES</Link>
              </li>
              <li>
                <Link href="/pakistan">PAKISTAN</Link>
              </li>
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
                <Link href="/uae">UNITED ARAB OF EMIRATES</Link>
              </li>
              <li>
                <Link href="/pakistan">PAKISTAN</Link>
              </li>
              <li>
                <Link href="/france/event/">FRANCE</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="#">LONG TERM</Link>
            <ul>
              <li>
                <Link href="/uae">UNITED ARAB OF EMIRATES</Link>
              </li>
              <li>
                <Link href="/pakistan">PAKISTAN</Link>
              </li>
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
            <Link href="/shop">PROPERTY</Link>
          </li>
          <li>
            <Link href="/locations">GOOGLE MAP LOCATIONS</Link>
          </li>
        </ul>
      </li>
      <li className="menu-icon">
        <Link href="/about">
          ABOUT 
          {/* <FaPlus /> */}
        </Link>
        {/* <ul>
          <li>
            <Link href="/history">HISTORY</Link>
          </li>
        </ul> */}
      </li>
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
