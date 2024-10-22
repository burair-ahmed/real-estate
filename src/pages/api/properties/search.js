// src/pages/api/properties/search.js
import dbConnect from "@/lib/dbConnect";
import Property from "@/models/Property";

export default async function handler(req, res) {
  await dbConnect();

  const { query } = req;
  const {
    priceSort,
    category,
    propertytype,
    priceMin,
    priceMax,
    proximities,
    state,
    country,
  } = query;

  let filter = {};

  // Filter by Category
  if (category) {
    filter.categories = category;
  }

  // Filter by Property Type
  if (propertytype) {
    filter.propertytype = propertytype;
  }

  // Filter by Price Range
  if (priceMin || priceMax) {
    filter.price = {};
    if (priceMin) filter.price.$gte = priceMin;
    if (priceMax) filter.price.$lte = priceMax;
  }

  // Filter by State and Country
  if (state) {
    filter.state = state;
  }
  if (country) {
    filter.country = country;
  }

  // Filter by Proximities
  if (proximities) {
    const proximitiesList = proximities.split(",");
    proximitiesList.forEach((proximity) => {
      filter[`proximities.${proximity}`] = true;
    });
  }

  try {
    let properties = await Property.find(filter);

    // Sort by Price
    if (priceSort === "lowToHigh") {
      properties = properties.sort((a, b) => a.price - b.price);
    } else if (priceSort === "highToLow") {
      properties = properties.sort((a, b) => b.price - a.price);
    }

    res.status(200).json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
