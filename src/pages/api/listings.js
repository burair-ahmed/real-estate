// src/pages/api/listings.js
import connectDB from '../../lib/db';
import Property from '../../models/Property';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
