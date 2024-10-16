// src/pages/api/properties/[slug].js
import connectDB from '../../../lib/db';
import Property from '../../../models/Property';

export default async function handler(req, res) {
    await connectDB(); // Ensure you're connected to the database

    const { slug } = req.query; // Get slug from request query

    if (req.method === 'GET') {
        try {
            const property = await Property.findOne({ slug });
            if (!property) {
                return res.status(404).json({ message: 'Property not found' });
            }
            res.status(200).json({ property }); // Send property data
        } catch (error) {
            console.error('Error fetching property:', error);
            res.status(500).json({ error: 'Error fetching property', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
