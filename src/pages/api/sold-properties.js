// src/pages/api/sold-properties.js
import connectDB from '../../lib/db';
import Property from '../../models/Property';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      // Fetch properties where propertytype is "Sold"
      const soldProperties = await Property.find({ propertytype: "Sold" });

      if (soldProperties.length > 0) {
        res.status(200).json(soldProperties);
      } else {
        res.status(404).json({ message: "No sold properties found" });
      }
    } catch (error) {
      console.error("Error fetching sold properties:", error);
      res.status(500).json({ error: 'Failed to fetch sold properties' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
