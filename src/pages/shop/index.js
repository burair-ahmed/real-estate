import { useState, useEffect } from "react";
import {
  FaThLarge,
  FaThList,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import ReactPaginate from "react-paginate";
import PropertyCard from "@/components/PropertyCard";
import axios from "axios";
import { LayoutOne } from "@/layouts";

const categoriesList = [
  "Apartment",
  "Villa",
  "Mansion",
  "Chalet",
  "Land",
  "Townhouse",
  "Business Premise",
  "Office",
];

function Shop() {
  const [sortType, setSortType] = useState("");
  const [filters, setFilters] = useState({
    title: "",
    priceMin: "",
    priceMax: "",
    categories: [],
    propertytype: "",
    state: "",
    country: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]); // Local state for selected categories
  const [offset, setOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [properties, setProperties] = useState([]);
  const pageLimit = 6;

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  const applyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      categories: selectedCategories, // Set the categories from local state
    }));
  };

  // Fetch filtered and sorted properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties/search", {
        params: {
          title: filters.title,
          priceMin: filters.priceMin,
          priceMax: filters.priceMax,
          categories: filters.categories.join(","),
          propertytype: filters.propertytype,
          state: filters.state,
          country: filters.country,
          bedrooms: filters.bedrooms,
          bathrooms: filters.bathrooms,
          sortBy: sortType,
        },
      });
      setProperties(response.data.properties);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters, sortType, offset]);

  useEffect(() => {
    const endOffset = offset + pageLimit;
    setCurrentItems(properties.slice(offset, endOffset));
    setPageCount(Math.ceil(properties.length / pageLimit));
  }, [offset, properties]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageLimit) % properties.length;
    setOffset(newOffset);
  };

  return (
    <LayoutOne topbar={true}>
      <ShopBreadCrumb title="Property" sectionPace="" currentSlug="Property" />

      <div className="ltn__product-area ltn__product-gutter mb-120">
        <Container>
          <Row>
            <Col xs={12} lg={8}>
              <Tab.Container defaultActiveKey="first">
                <div className="ltn__shop-options">
                  <ul className="justify-content-between">
                    <li>
                      <div className="ltn__grid-list-tab-menu">
                        <Nav className="nav">
                          <Nav.Link eventKey="first">
                            <FaThLarge />
                          </Nav.Link>
                          <Nav.Link eventKey="second">
                            <FaThList />
                          </Nav.Link>
                        </Nav>
                      </div>
                    </li>

                    <li>
                      <div className="short-by text-center">
                        <Form.Select
                          className="form-control nice-select"
                          onChange={(e) => setSortType(e.target.value)}
                        >
                          <option value="">Sort by</option>
                          <option value="priceAsc">Price - Low to High</option>
                          <option value="priceDesc">Price - High to Low</option>
                        </Form.Select>
                      </div>
                    </li>
                  </ul>
                </div>

                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                      <Row>
                        {currentItems.map((property) => (
                          <Col key={property._id} xs={12} sm={6}>
                            <PropertyCard
                              propertyData={property}
                              slug={property.slug}
                              baseUrl="properties"
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                    <div className="ltn__product-tab-content-inner ltn__product-list-view">
                      <Row>
                        {currentItems.map((property) => (
                          <Col key={property._id} xs={12}>
                            <PropertyCard
                              propertyData={property}
                              slug={property.slug}
                              baseUrl="properties"
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>

              <div className="ltn__pagination-area text-center">
                <ReactPaginate
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  nextLabel={<FaAngleDoubleRight />}
                  previousLabel={<FaAngleDoubleLeft />}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination ltn__pagination justify-content-center"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </Col>

            <Col xs={12} lg={4}>
              <div className="filter-section ltn__contact-message-area mt-4">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="ltn__form-box contact-form-box box-shadow widget ltn__menu-widget">
                        <form id="filter-form">
                          <div className="input-item ltn__custom-icon">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              type="text"
                              name="title"
                              placeholder="Search by title"
                              onChange={handleFilterChange}
                              className="input-item-name"
                            />
                            <hr />
                          </div>

                          <div className="input-item ltn__custom-icon">
                            <Form.Group controlId="filterCategories">
                              <Form.Label>Category</Form.Label>
                              {categoriesList.map((category) => (
                                <Form.Check
                                  type="checkbox"
                                  key={category}
                                  label={category}
                                  value={category}
                                  checked={selectedCategories.includes(category)} // Use local state
                                  onChange={handleCategoryChange}
                                  className={`category-checkbox ${
                                    selectedCategories.includes(category) ? "checked" : ""
                                  }`}
                                />
                              ))}
                            </Form.Group>
                            <hr />
                          </div>

                          <div className="input-item ltn__custom-icon">
                            <Form.Label>Price Range</Form.Label>
                            <Form.Control
                              type="number"
                              name="priceMin"
                              placeholder="Min"
                              onChange={handleFilterChange}
                              className="input-item"
                            />
                            <Form.Control
                              type="number"
                              name="priceMax"
                              placeholder="Max"
                              onChange={handleFilterChange}
                              className="input-item mt-4"
                            />
                            <hr />
                          </div>

                          <div className="input-item ltn__custom-icon">
                            <Form.Label className="mt-0">Property Type</Form.Label>
                            <Form.Control
                              as="select"
                              name="propertytype"
                              onChange={handleFilterChange}
                              className="input-item "
                            >
                              <option value="">All</option>
                              <option value="apartment">Apartment</option>
                              <option value="house">House</option>
                            </Form.Control>
                            <hr />
                          </div>

                          <div className="input-item ltn__custom-icon">
                            <Form.Label>Bedrooms</Form.Label>
                            <Form.Control
                              type="number"
                              name="bedrooms"
                              placeholder="Bedrooms"
                              onChange={handleFilterChange}
                              className="input-item"
                            />
                            <hr />
                          </div>

                          <div className="input-item ltn__custom-icon">
                            <Form.Label>Bathrooms</Form.Label>
                            <Form.Control
                              type="number"
                              name="bathrooms"
                              placeholder="Bathrooms"
                              onChange={handleFilterChange}
                              className="input-item"
                            />
                            <hr />
                          </div>

                          <button
                            type="button"
                            onClick={applyFilters} // Call applyFilters to update filters
                            className="btn theme-btn-1 btn-effect-1"
                          >
                            Apply Filters
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}

export default Shop;
