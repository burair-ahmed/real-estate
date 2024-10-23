import dbConnect from '../../../lib/db';
import Property from '../../../models/Property';

// This will handle the GET request for searching properties
export default async function handler(req, res) {
    const { method, query } = req;

    // Connect to the database
    await dbConnect();

    if (method === 'GET') {
        try {
            const {
                title,
                priceMin,
                priceMax,
                categories,
                propertytype,
                country,
                state,
                bedrooms,
                bathrooms,
                proximities,
                sortBy
            } = query;

            // Initialize the query object
            let searchQuery = {};

            // 1. Title (case-insensitive partial match)
            if (title) {
                searchQuery.title = { $regex: title, $options: 'i' };
            }

            // 2. Price Range
            if (priceMin || priceMax) {
                searchQuery.price = {};
                if (priceMin) searchQuery.price.$gte = priceMin;
                if (priceMax) searchQuery.price.$lte = priceMax;
            }

            // 3. Categories
            if (categories) {
                searchQuery.categories = { $in: categories.split(',') };
            }

            // 4. Property Type
            if (propertytype) {
                searchQuery.propertytype = { $in: propertytype.split(',') };
            }

            // 5. Country and State
            if (country) {
                searchQuery.country = country;
            }
            if (state) {
                searchQuery.state = state;
            }

            // 6. Features (bedrooms, bathrooms)
            if (bedrooms) {
                searchQuery['features.bedrooms'] = bedrooms;
            }
            if (bathrooms) {
                searchQuery['features.bathrooms'] = bathrooms;
            }

            // 7. Proximities (if any of the proximities are true)
            if (proximities) {
                let proximityQuery = {};
                proximities.split(',').forEach((proximity) => {
                    proximityQuery[`proximities.${proximity}`] = true;
                });
                searchQuery = { ...searchQuery, ...proximityQuery };
            }

            // Sorting (default by created date, descending)
            let sortOption = { createdAt: -1 };
            if (sortBy === 'priceAsc') {
                sortOption = { price: 1 };
            } else if (sortBy === 'priceDesc') {
                sortOption = { price: -1 };
            }

            // Fetch properties based on query and sorting
            const properties = await Property.find(searchQuery).sort(sortOption);

            res.status(200).json({
                success: true,
                count: properties.length,
                properties,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server Error',
                error: error.message,
            });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
