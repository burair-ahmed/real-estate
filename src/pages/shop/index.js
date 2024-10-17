import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import { FaThLarge, FaThList, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import SideBar from "@/components/shopSideBar";
import ReactPaginate from "react-paginate";
import PropertyCard from "@/components/PropertyCard";
import axios from 'axios';
import { LayoutOne } from "@/layouts";

function Shop() {
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);

  const pageLimit = 6; // Set your desired items per page

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  // Fetch properties data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/listings');
        console.log(response.data); // Check if images are being fetched
        setProperties(response.data);
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);

  // Pagination logic for properties
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
                          onChange={(e) =>
                            getSortParams("filterSort", e.target.value)
                          }
                        >
                          <option value="default">Default</option>
                          <option value="priceHighToLow">Price - High to Low</option>
                          <option value="priceLowToHigh">Price - Low to High</option>
                        </Form.Select>
                      </div>
                    </li>
                  </ul>
                </div>

                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                      <Row>
                        {currentItems.map((property, key) => (
                          <Col key={key} xs={12} sm={6}>
                            <PropertyCard
                              key={property._id}
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
                      
                          {currentItems.map((property, key) => (
                            <Col key={key} xs={12}>
                             <PropertyCard
                              key={property._id}
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
              <SideBar properties={properties} getSortParams={getSortParams} />
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}

export default Shop;
