import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const HeaderTopInfo = function () {
  return (
    <>
      <div className="ltn__top-bar-menu">
        <ul>
          <li>
            <Link href="mailto:info@prairieshills.com">
              <FaEnvelope />
              <i></i> info@prairieshills.com
            </Link>
          </li>
          <li>
            <Link href="/locations">
              <FaMapMarkerAlt />
              Office 720 DIC, Dubai
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderTopInfo;
