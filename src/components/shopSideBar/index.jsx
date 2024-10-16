// src/components/shopSideBar/index.jsx
import {
  getIndividualAminities,
  getIndividualAminitiesList,
  priceRange,
  bedBath,
  setActiveSort,
} from "@/lib/product";
import FilterByPrice from "../FilterByPrice";

const SideBar = ({ properties, getSortParams }) => {
  const aminities = getIndividualAminities(properties);
  const aminitiesList = getIndividualAminitiesList(properties);
  const priceRanges = priceRange(properties);
  const bedBaths = bedBath(properties);

  // Function to get individual categories from the properties
  const getIndividualCategoriesList = (properties) => {
    let categoriesList = [];
    properties.forEach((property) => {
      // Check if property.categories is an array
      if (Array.isArray(property.categories)) {
        property.categories.forEach((category) => {
          categoriesList.push(category);
        });
      }
    });
    // Filter out duplicate categories
    return [...new Set(categoriesList)];
  };

  const categoriesList = getIndividualCategoriesList(properties); // Get categories for filtering

  // Function to get individual proximities from the properties
  const getIndividualProximitiesList = (properties) => {
    let proximitiesList = [];
    properties.forEach((property) => {
      // Check if property.proximities is an object
      if (property.proximities && typeof property.proximities === 'object') {
        // Extract keys from the object to get proximity names
        Object.keys(property.proximities).forEach((key) => {
          // If the proximity value is true, include it in the list
          if (property.proximities[key]) {
            proximitiesList.push(key);
          }
        });
      }
    });
    // Filter out duplicate proximities
    return [...new Set(proximitiesList)];
  };

  const proximitiesList = getIndividualProximitiesList(properties); // Get proximities for filtering

  // Calculate the total number of properties
  const totalProperties = properties.length;

  return (
    <>
      <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
        <h3 className="mb-10">Advance Information</h3>
        <label className="mb-30">
          <small>About {totalProperties} results</small>
        </label>

        {/* Property Type Filter */}
        <div className="widget ltn__menu-widget">
          <h4 className="ltn__widget-title">Property Type</h4>
          {categoriesList.length > 0 ? (
            <ul>
              {categoriesList.map((category, key) => (
                <li key={key}>
                  <div>
                    <label className="checkbox-item">
                      {category}
                      <input
                        onClick={(e) => {
                          getSortParams("categories", category);
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
          {/* Proximities Filter */}
          <h4 className="ltn__widget-title">Proximities</h4>
          {proximitiesList.length > 0 ? (
            <ul>
              {proximitiesList.map((proximity, key) => (
                <li key={key}>
                  <div>
                    <label className="checkbox-item">
                      {proximity}
                      <input
                        onClick={(e) => {
                          getSortParams("proximities", proximity);
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
            "No proximities found"
          )}

          <hr />
          {/* Amenities Filter */}
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
            "No amenities found"
          )}

          <hr />
          {/* Price Range Filter */}
          <h4 className="ltn__widget-title">Price Range</h4>
          <div className="price_filter">
            <FilterByPrice />
          </div>

          <hr />
          {/* Bed/Bath Filter */}
          <h4 className="ltn__widget-title">Bed/Bath</h4>
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
            "No bed/bath options found"
          )}

          <hr />
          {/* Additional Filters */}
          <h4 className="ltn__widget-title">Furnishing</h4>
          <div>
            <label className="checkbox-item">
              Furnished
              <input
                onClick={(e) => {
                  getSortParams("furnished", true);
                  setActiveSort(e);
                }}
                type="checkbox"
              />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-item">
              Not Furnished
              <input
                onClick={(e) => {
                  getSortParams("furnished", false);
                  setActiveSort(e);
                }}
                type="checkbox"
              />
              <span className="checkmark"></span>
            </label>
          </div>

          <hr />
          {/* Air Conditioning Filter */}
          <h4 className="ltn__widget-title">Air Conditioning</h4>
          <div>
            <label className="checkbox-item">
              Yes
              <input
                onClick={(e) => {
                  getSortParams("airConditioned", true);
                  setActiveSort(e);
                }}
                type="checkbox"
              />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-item">
              No
              <input
                onClick={(e) => {
                  getSortParams("airConditioned", false);
                  setActiveSort(e);
                }}
                type="checkbox"
              />
              <span className="checkmark"></span>
            </label>
          </div>

          <hr />
          {/* Other Features */}
          <h4 className="ltn__widget-title">Other Features</h4>
          {Object.keys(properties[0]?.features || {}).map((feature, index) => (
            <div key={index}>
              <label className="checkbox-item">
                {feature}
                <input
                  onClick={(e) => {
                    const isFeatureChecked = e.target.checked;
                    getSortParams(feature, isFeatureChecked);
                    setActiveSort(e);
                  }}
                  type="checkbox"
                />
                <span className="checkmark"></span>
              </label>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
