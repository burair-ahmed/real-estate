import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

const buyRentOptions = ["Buy", "Rent"];

function Shop() {
  const [sortType, setSortType] = useState("");
  const [filters, setFilters] = useState({
    title: "",
    priceMin: "",
    priceMax: "",
    categories: [],
    propertytype: [],
    state: "",
    country: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [properties, setProperties] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const pageLimit = 6;
  const router = useRouter();

  useEffect(() => {
    const {
      title = "",
      priceMin = "",
      priceMax = "",
      categories = "",
      propertytype = "",
      state = "",
      country = "",
      bedrooms = "",
      bathrooms = "",
      sortBy = "",
    } = router.query;

    setFilters({
      title,
      priceMin,
      priceMax,
      categories: categories.split(",").filter(Boolean),
      propertytype: propertytype.split(",").filter(Boolean),
      state,
      country,
      bedrooms,
      bathrooms,
    });
    setSortType(sortBy);
  }, [router.query]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties/search", {
        params: {
          ...filters,
          categories: filters.categories.join(","),
          propertytype: filters.propertytype.join(","),
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
  }, [filters, sortType]);

  useEffect(() => {
    const endOffset = offset + pageLimit;
    setCurrentItems(properties.slice(offset, endOffset));
    setPageCount(Math.ceil(properties.length / pageLimit));
  }, [offset, properties]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageLimit) % properties.length;
    setOffset(newOffset);
  };

  const applyFilters = () => {
    const query = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        query[key] = value.join(",");
      } else if (value) {
        query[key] = value;
      }
    });

    if (sortType) query.sortBy = sortType;

    router.push({
      pathname: "/shop",
      query,
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories.filter((cat) => cat !== value)
        : [...prev.categories, value],
    }));
  };

  const handlePropertyTypeChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      propertytype: prev.propertytype.includes(value)
        ? prev.propertytype.filter((type) => type !== value)
        : [...prev.propertytype, value],
    }));
  };

  return (
    <LayoutOne topbar={true}>
     <ShopBreadCrumb
          title="Property Listings"
          sectionPace=""
          currentSlug="Property"
          bgImage="/img/bg/55.jpg"
        />

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
                              value={filters.title}
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
                                  checked={filters.categories.includes(category)}
                                  onChange={handleCategoryChange}
                                />
                              ))}
                            </Form.Group>
                            <hr />
                          </div>
                          <div className="input-item ltn__custom-icon">
                            <Form.Label>Buy or Rent</Form.Label>
                            {buyRentOptions.map((option) => (
                              <Form.Check
                                type="checkbox"
                                key={option}
                                label={option}
                                value={option}
                                checked={filters.propertytype.includes(option)}
                                onChange={handlePropertyTypeChange}
                              />
                            ))}
                            <hr />
                          </div>
                          <div className="input-item ltn__custom-icon">
                            <Form.Label>Price Range</Form.Label>
                            <Form.Control
                              type="number"
                              name="priceMin"
                              placeholder="Min"
                              onChange={handleFilterChange}
                              value={filters.priceMin}
                            />
                            <Form.Control
                              type="number"
                              name="priceMax"
                              placeholder="Max"
                              onChange={handleFilterChange}
                              value={filters.priceMax}
                              className="mt-4"
                            />
                            <hr />
                          </div>
                          <div className="input-item ltn__custom-icon">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              as="select"
                              name="country"
                              onChange={handleFilterChange}
                              value={filters.country}
                            >
                              <option value="">Select Country</option>
                              <option value="United Arab Emirates">United Arab Emirates</option>
                              <option value="Pakistan">Pakistan</option>
                              {/* Add other countries as needed */}
                            </Form.Control>
                            <hr />
                          </div>
                          <button
                            type="button"
                            onClick={applyFilters}
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
