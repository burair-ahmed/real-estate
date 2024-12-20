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
            <Link href="/shop?propertytype=Buy&country=United+Arab+Emirates">UNITED ARAB OF EMIRATES</Link>
          </li>
          <li>
            <Link href="/shop?propertytype=Buy&country=Pakistan">PAKISTAN</Link>
          </li>
          {/* <li>
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
          </li> */}
        </ul>
      </li>
      <li className="menu-icon">
        <Link href="">
          RENT <FaPlus />
        </Link>
        <ul>
              <li>
                <Link href="/shop?propertytype=Rent&country=United+Arab+Emirates">UNITED ARAB OF EMIRATES</Link>
              </li>
              <li>
                <Link href="/shop?propertytype=Rent&country=Pakistan">PAKISTAN</Link>
              </li>
        </ul>
      </li>
      {/* <li className="menu-icon">
        <Link href="/shop">
        PROPERTY 
        </Link>
      </li> */}
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
