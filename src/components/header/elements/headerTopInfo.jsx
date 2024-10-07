import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const HeaderTopInfo = function () {
  return (
    <>
      <div className="ltn__top-bar-menu">
        <ul className="header-contact-info">
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

      {/* Styled JSX for responsive behavior */}
      <style jsx>{`
        .header-contact-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        @media (max-width: 768px) {
          .header-contact-info {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderTopInfo;
