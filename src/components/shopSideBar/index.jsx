import {
  getIndividualAminities,
  getIndividualAminitiesList,
  priceRange,
  bedBath,
  getIndividualCategories,
  setActiveSort,
} from "@/lib/product";
import FilterByPrice from "../FilterByPrice";

const SideBar = ({ products, getSortParams }) => {
  const aminities = getIndividualAminities(products);
  const aminitiesList = getIndividualAminitiesList(products);
  const priceRanges = priceRange(products);
  const bedBaths = bedBath(products);
  const categories = getIndividualCategories(products);

  // Calculate the total number of properties
  const totalProperties = products.length;

  return (
    <>
      <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
        <h3 className="mb-10">Advance Information</h3>
        <label className="mb-30">
          {/* Dynamically display the total number of properties */}
          <small>About {totalProperties} results</small>
        </label>
        {/* <!-- Advance Information widget --> */}
        <div className="widget ltn__menu-widget">
          <h4 className="ltn__widget-title">Property Type</h4>
          {aminities.length > 0 ? (
            <ul>
              {aminities.map((aminitie, key) => (
                <li key={key}>
                  <div>
                    <label className="checkbox-item">
                      {aminitie.name}
                      <input
                        onClick={(e) => {
                          getSortParams("propertyTypes", aminitie.name);
                          setActiveSort(e);
                        }}
                        type="checkbox"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            "No categories found"
          )}

          <hr />
          <h4 className="ltn__widget-title">Amenities</h4>
          {aminitiesList.length > 0 ? (
            <ul>
              {aminitiesList.map((aminitie, key) => (
                <li key={key}>
                  <div>
                    <label className="checkbox-item">
                      {aminitie.name}
                      <input
                        onClick={(e) => {
                          getSortParams("AmenitiesList", aminitie.name);
                          setActiveSort(e);
                        }}
                        type="checkbox"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            "No categories found"
          )}

          <hr />
          <h4 className="ltn__widget-title">Price Range</h4>
          {priceRanges.length > 0 ? (
            <ul>
              {priceRanges.map((price, key) => (
                <li key={key}>
                  <div>
                    <label className="checkbox-item">
                      {price.name}
                      <input
                        onClick={(e) => {
                          getSortParams("priceRange", price.name);
                          setActiveSort(e);
                        }}
                        type="checkbox"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            "No categories found"
          )}

          {/* <!-- Price Filter Widget --> */}
          <div className="ltn__price-filter-widget mt-30">
            <h4 className="ltn__widget-title">Filter by price</h4>
            <div className="price_filter">
              <FilterByPrice />
            </div>
          </div>

          <hr />
          <h4 className="ltn__widget-title">Bed/bath</h4>
          {bedBaths.length > 0 ? (
            <ul>
              {bedBaths.map((bath, key) => (
                <li key={key}>
                  <div>
                    <label className="checkbox-item">
                      {bath.name}
                      <input
                        onClick={(e) => {
                          getSortParams("bedBath", bath.name);
                          setActiveSort(e);
                        }}
                        type="checkbox"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            "No categories found"
          )}

          <hr />
          <h4 className="ltn__widget-title">Category</h4>
          {categories.length > 0 ? (
            <ul>
              {categories.map((categorie, key) => (
                <li key={key}>
                  <div>
                    <label className="checkbox-item">
                      {categorie.name}
                      <input
                        onClick={(e) => {
                          getSortParams("category", categorie.name);
                          setActiveSort(e);
                        }}
                        type="checkbox"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            "No categories found"
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
