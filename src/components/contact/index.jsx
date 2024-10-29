import { useState } from "react";
import { Form } from "react-bootstrap";
import {
  FaUserAlt,
  FaEnvelope,
  FaPencilAlt,
  FaPhoneAlt,
  FaArrowDown,
} from "react-icons/fa";
import Image from "next/image";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    agree: false,
  });

  const [statusMessage, setStatusMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(""); // Clear any previous messages

    try {
      const response = await fetch("/api/sendEmail/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage("Your message has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          agree: false,
        }); // Reset form after successful submission
      } else {
        setStatusMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("An error occurred while sending the message.");
    }
  };

  return (
    <>
      {/* CONTACT ADDRESS AREA START */}
      <div className="ltn__contact-address-area mb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <Image src="/img/icons/10.png" alt="Icon Image" width={80} height={78} />
                </div>
                <h3>Email Address</h3>
                <p>info@prairieshills.com</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <Image src="/img/icons/11.png" alt="Icon Image" width={80} height={77} />
                </div>
                <h3>Phone Number</h3>
                <p>055-3575797</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <Image src="/img/icons/12.png" alt="Icon Image" width={80} height={77} />
                </div>
                <h3>Office Address</h3>
                <p>Office 720 DIC, Dubai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CONTACT ADDRESS AREA END */}

      {/* CONTACT MESSAGE AREA START */}
      <div className="ltn__contact-message-area mb-120 mb--100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__form-box contact-form-box box-shadow white-bg">
                <h4 className="title-2">Get A Quote</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <span className="inline-icon">
                          <FaUserAlt />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-email ltn__custom-icon">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <span className="inline-icon">
                          <FaEnvelope />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item ltn__custom-icon">
                        <Form.Select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Service Type</option>
                          <option>Property Management</option>
                          <option>Mortgage Service</option>
                          <option>Consulting Service</option>
                          <option>Home Buying</option>
                          <option>Home Selling</option>
                          <option>Escrow Services</option>
                        </Form.Select>
                        <span className="inline-icon">
                          <FaArrowDown />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-phone ltn__custom-icon">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                        <span className="inline-icon">
                          <FaPhoneAlt />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea
                      name="message"
                      placeholder="Enter message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <span className="inline-icon">
                      <FaPencilAlt />
                    </span>
                  </div>
                  <p>
                    <label className="input-info-save mb-0">
                      <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                      />{" "}
                      Save my name, email, and website in this browser for the next time I comment.
                    </label>
                  </p>
                  <div className="btn-wrapper mt-0">
                    <button
                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                      type="submit"
                    >
                      get a free service
                    </button>
                  </div>
                  <p className="form-messege mb-0 mt-20">{statusMessage}</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CONTACT MESSAGE AREA END */}

      {/* GOOGLE MAP AREA START */}
      <div className="google-map mb-120">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.633025116105!2d55.25147241506698!3d25.092840143948647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f68b49313e81b%3A0x9793f3d7fcb227ee!2sOffice%20720%20DIC%2C%20Dubai!5e0!3m2!1sen!2sbd!4v1694445357713!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
        {/* <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.633025116105!2d55.25147241506698!3d25.092840143948647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f68b49313e81b%3A0x9793f3d7fcb227ee!2sOffice%20720%20DIC%2C%20Dubai!5e0!3m2!1sen!2sbd!4v1694445357713!5m2!1sen!2sbd"
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
></iframe> */}

      </div>
      {/* GOOGLE MAP AREA END */}
    </>
  );
};

export default Contact;
