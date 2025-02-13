import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderTopInfo from "../elements/headerTopInfo";
import HeaderSocialLinks from "../elements/headerSocialLinks";

const HeaderTopBarOne = function () {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/getUser", {
        method: "GET",
        credentials: "include", // Important to send cookies
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data); // Set the user info from the response
      } else {
        console.error("Failed to fetch user data");
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="ltn__header-top-area section-bg-6 top-area-color-white--- top-bar">
        <Container>
          <Row>
            <Col xs={12} md={7}>
              <HeaderTopInfo />
            </Col>
            <Col xs={12} md={5}>
              <div className="top-bar-right text-end">
                <div className="ltn__top-bar-menu mx-auto">
                  <ul>
                    <li>
                      {/* Social media links */}
                      <HeaderSocialLinks />
                    </li>
                    <li>
                      {/* Add Listing button: Only show if user is logged in */}
                      {!loading && user && (
                        <div className="header-top-btn">
                          <Link href="/add-listing">Add Listing</Link>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Styled JSX for responsive behavior */}
      <style jsx>{`
        .top-bar {
          display: block;
        }

        @media (max-width: 768px) {
          .top-bar {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderTopBarOne;
