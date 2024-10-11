import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { LayoutOne } from "@/layouts";
import { Container, Row, Col } from "react-bootstrap";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import Link from "next/link";

function Register() {
  const router = useRouter(); // Initialize the router
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      // Clear form fields on successful submission
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
      });

      setSuccessMessage(data.message);
      setError(null); // Clear any previous error

      // Redirect to the login page after successful registration
      router.push('/login');
    } catch (error) {
      setError(error.message); // Set error message
      setSuccessMessage(null); // Clear any previous success message
    }
  };

  return (
    <>
      <LayoutOne topbar={true}>
        <ShopBreadCrumb title="Account" sectionPace="" currentSlug="Register" />

        <div className="ltn__login-area pb-110">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="section-title-area text-center">
                  <h1 className="section-title">
                    Register <br />
                    Your Account
                  </h1>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
                    <br />
                    Sit aliquid, Non distinctio vel iste.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={{ span: 6, offset: 3 }}>
                <div className="account-login-inner">
                  <form onSubmit={handleSubmit} className="ltn__form-box contact-form-box">
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                    />
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email*"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password*"
                      required
                    />
                    <input
                      type="password"
                      name="confirmpassword"
                      value={formData.confirmpassword}
                      onChange={handleChange}
                      placeholder="Confirm Password*"
                      required
                    />
                    <label className="checkbox-inline">
                      <input type="checkbox" value="" required />
                      I consent to Herboil processing my personal data in order to send personalized marketing material in accordance with the consent form and the privacy policy.
                    </label>
                    <label className="checkbox-inline">
                      <input type="checkbox" value="" required />
                      By clicking create account, I consent to the privacy policy.
                    </label>
                    <div className="btn-wrapper">
                      <button className="theme-btn-1 btn reverse-color btn-block" type="submit">
                        CREATE ACCOUNT
                      </button>
                    </div>
                  </form>

                  {/* Display error or success messages */}
                  {error && <div className="error-message">{error}</div>}
                  {successMessage && <div className="success-message">{successMessage}</div>}

                  <div className="by-agree text-center">
                    <p>By creating an account, you agree to our:</p>
                    <p>
                      <Link href="#">
                        TERMS OF CONDITIONS &nbsp; &nbsp; | &nbsp; &nbsp;
                        PRIVACY POLICY
                      </Link>
                    </p>
                    <div className="go-to-btn mt-50">
                      <Link href="/login">ALREADY HAVE AN ACCOUNT?</Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

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
}

export default Register;
