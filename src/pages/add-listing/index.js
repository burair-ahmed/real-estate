import Link from "next/link";
import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import { LayoutOne } from "@/layouts";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";


function AddListingPage() {


 // Define state for formData and inputValues
 const [formData, setFormData] = useState({
  area: false,
  bedrooms: false,
  rooms: false,
  bathrooms: false,
  furnished: false,
  airconditioned: false,
  view: false,
  floor: false,
  direction: false,
  fireplace: false,
});

const [inputValues, setInputValues] = useState({
  areaValue: "",
  bedroomsValue: "",
  roomsValue: "",
  bathroomsValue: "",
  viewValue: "",
  floorValue: "",
  directionValue: "",
});

// Handle checkbox changes
const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;
  setFormData({
    ...formData,
    [name]: checked,
  });
};

// Handle input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setInputValues({
    ...inputValues,
    [name]: value,
  });
};



  return (
    <>
      <LayoutOne topbar={true}>
        <ShopBreadCrumb
          title="Add Listing"
          sectionPace=""
          currentSlug="Add Listing"
        />
        {/* // <!-- APPOINTMENT AREA START --> */}
        <div className="ltn__appointment-area pb-120">
          <Container>
            <Row>
              <Col xs={12}>
                <form action="#">
                  <Tab.Container defaultActiveKey="first">
                    <div className="ltn__tab-menu ltn__tab-menu-3 text-center">
                      <Nav className="nav justify-content-center">
                        <Nav.Link eventKey="first">
                          1. Property Details
                        </Nav.Link>
                        <Nav.Link eventKey="second">2. Images</Nav.Link>
                        <Nav.Link eventKey="third">3. Features</Nav.Link>
                        <Nav.Link eventKey="fourth">4. Proximities</Nav.Link>
                        {/* <Nav.Link eventKey="five">5. Amenities</Nav.Link> */}
                      </Nav>
                    </div>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="ltn__apartments-tab-content-inner">
                          <h6>Property Description</h6>
                          <Row>
                            <div className="col-md-12">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Property Title"
                                />
                              </div>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <textarea
                                  name="ltn__message"
                                  placeholder="Description"
                                ></textarea>
                              </div>
                            </div>
                          </Row>
                          <Row>
                          <Col xs={12} md={6} lg={6}>
                          <h6>Property Price</h6>

                          </Col>
                          <Col xs={12} md={6} lg={6}>
                          <h6>Property ID</h6>

                          </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Price in $ (only numbers)"
                                />
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Property ID"
                                />
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            </Row>
                            <Row>
                          <Col xs={12} md={6} lg={6}>
                          <h6>Property Category</h6>

                          </Col>
                          <Col xs={12} md={6} lg={6}>
                          <h6>Property Type</h6>

                          </Col>
                          </Row>
                            <Row>
                            <Col xs={12} md={6}>
                            <div className="input-item ltn__custom-icon">
                                <Form.Select className="nice-select">
                                  <option>Make A Selection</option>
                                  <option value="1">Appartment</option>
                                  <option value="2">Villa</option>
                                  <option value="3">Mansion</option>
                                  <option value="4">Chalet</option>
                                  <option value="5">Land</option>
                                  <option value="6">Townhouse</option>
                                  <option value="7">Business Premise</option>
                                  <option value="8">Office</option>
                                </Form.Select>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                            <div className="input-item ltn__custom-icon">
                                <Form.Select className="nice-select">
                                  <option>Make A Selection</option>
                                  <option value="1">Buy</option>
                                  <option value="2">Rent</option>
                                  <option value="3">Development</option>
                                </Form.Select>
                              </div>
                            </Col>
   
                          </Row>

                          <div className="btn-wrapper mt-0">
                            <button
                              type="submit"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                            >
                              Next Step
                            </button>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="ltn__product-tab-content-inner">
                     
                          <div className="btn-wrapper  mt-0">
                            {/* <!-- <button type="submit" className="btn theme-btn-1 btn-effect-1 text-uppercase" >Next Step</button> --> */}
                            <Link
                              href="#"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                            >
                              Prev Step
                            </Link>
                            <Link
                              href="#"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                            >
                              Next Step
                            </Link>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
  <div className="ltn__product-tab-content-inner">
    <h6>Property Features</h6>
    <Row>
      <Col xs={12} md={6}>
        <label className="checkbox-item">
          Area
          <input 
            type="checkbox" 
            name="area" 
            checked={formData.area}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
        {formData.area && (
          <Form.Control
            className="input-item"
            type="text"
            placeholder="Enter area"
            name="areaValue"
            value={inputValues.areaValue}
            onChange={handleInputChange}
          />
        )}
      </Col>

      <Col xs={12} md={6}>
        <label className="checkbox-item">
          No. of Bedrooms
          <input 
            type="checkbox" 
            name="bedrooms" 
            checked={formData.bedrooms}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
        {formData.bedrooms && (
          <Form.Control
            className="input-item"
            type="text"
            placeholder="Enter number of bedrooms"
            name="bedroomsValue"
            value={inputValues.bedroomsValue}
            onChange={handleInputChange}
          />
        )}
      </Col>
    </Row>

    <Row>
      <Col xs={12} md={6}>
        <label className="checkbox-item">
          No. of Rooms
          <input 
            type="checkbox" 
            name="rooms" 
            checked={formData.rooms}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
        {formData.rooms && (
          <Form.Control
            className="input-item"
            type="text"
            placeholder="Enter number of rooms"
            name="roomsValue"
            value={inputValues.roomsValue}
            onChange={handleInputChange}
          />
        )}
      </Col>

      <Col xs={12} md={6}>
        <label className="checkbox-item">
          No. of Bathrooms
          <input 
            type="checkbox" 
            name="bathrooms" 
            checked={formData.bathrooms}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
        {formData.bathrooms && (
          <Form.Control
            className="input-item"
            type="text"
            placeholder="Enter number of bathrooms"
            name="bathroomsValue"
            value={inputValues.bathroomsValue}
            onChange={handleInputChange}
          />
        )}
      </Col>
    </Row>

    <Row>
      <Col xs={12} md={6}>
        <label className="checkbox-item">
          Furnished
          <input 
            type="checkbox" 
            name="furnished"
            checked={formData.furnished}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
      </Col>

      <Col xs={12} md={6}>
        <label className="checkbox-item">
          Airconditioned
          <input 
            type="checkbox" 
            name="airconditioned"
            checked={formData.airconditioned}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
      </Col>
    </Row>

    <Row>
      <Col xs={12} md={6}>
        <label className="checkbox-item">
          View
          <input 
            type="checkbox" 
            name="view"
            checked={formData.view}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
        {formData.view && (
          <Form.Control
            className="input-item"
            type="text"
            placeholder="Enter view"
            name="viewValue"
            value={inputValues.viewValue}
            onChange={handleInputChange}
          />
        )}
      </Col>

      <Col xs={12} md={6}>
        <label className="checkbox-item">
          Floor
          <input 
            type="checkbox" 
            name="floor"
            checked={formData.floor}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
        {formData.floor && (
          <Form.Control
            className="input-item"
            type="text"
            placeholder="Enter floor"
            name="floorValue"
            value={inputValues.floorValue}
            onChange={handleInputChange}
          />
        )}
      </Col>
    </Row>

    <Row>
      <Col xs={12} md={6}>
        <label className="checkbox-item">
          Direction
          <input 
            type="checkbox" 
            name="direction"
            checked={formData.direction}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
        {formData.direction && (
          <Form.Control
            className="input-item"
            type="text"
            placeholder="Enter direction"
            name="directionValue"
            value={inputValues.directionValue}
            onChange={handleInputChange}
          />
        )}
      </Col>

      <Col xs={12} md={6}>
        <label className="checkbox-item">
          Fireplace
          <input 
            type="checkbox" 
            name="fireplace"
            checked={formData.fireplace}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
      </Col>
    </Row>

    <div className="btn-wrapper  mt-0">
      <Link href="#" className="btn theme-btn-1 btn-effect-1 text-uppercase">
        Prev Step
      </Link>
      <Link href="#" className="btn theme-btn-1 btn-effect-1 text-uppercase">
        Next Step
      </Link>
    </div>
  </div>
</Tab.Pane>

                      <Tab.Pane eventKey="fourth">
                        <div className="ltn__product-tab-content-inner">
                          <h6>Proximities</h6>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Bus
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Shops
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Metro
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Super Markets
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Town centre
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Sports centre
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Park
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                TGV Station
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Doctor
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Taxi
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Convention centre
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Highway
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Airport
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Tennis
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Sea
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Bus hub
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Seaport
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Station
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Hospital
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Clinic
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Golf
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Movies
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Beach
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Public parking
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>

                        
                          <div className="btn-wrapper  mt-40">
                            {/* <!-- <button type="submit" className="btn theme-btn-1 btn-effect-1 text-uppercase" >Next Step</button> --> */}
                            <Link
                              href="#"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                            >
                              Prev Step
                            </Link>
                            <Link
                              href="#"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                            >
                              Create Property
                            </Link>
                          </div>
                        </div>
                      </Tab.Pane>

                    </Tab.Content>
                  </Tab.Container>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
        {/* // <!-- APPOINTMENT AREA END --> */}
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

export default AddListingPage;
