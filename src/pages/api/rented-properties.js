// src/pages/api/rented-properties.js
import connectDB from '../../lib/db';
import Property from '../../models/Property';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      // Fetch properties where propertytype is "Rented"
      const rentedProperties = await Property.find({ propertytype: "Rented" });

      if (rentedProperties.length > 0) {
        res.status(200).json(rentedProperties);
      } else {
        res.status(404).json({ message: "No rented properties found" });
      }
    } catch (error) {
      console.error("Error fetching rented properties:", error);
      res.status(500).json({ error: 'Failed to fetch rented properties' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
