// src/pages/api/add-listing.js
import connectDB from '../../lib/db';  // This is correct, given that db.js is in the lib folder
import Property from '../../models/Property';

export default async function handler(req, res) {
    await connectDB();  // This should now work

    if (req.method === 'POST') {
        try {
            const propertyData = req.body;

            // Create a new property instance
            const newProperty = new Property(propertyData);
            await newProperty.save();  // Save the new property to the database

            res.status(201).json({ message: 'Property added successfully!', property: newProperty });
        } catch (error) {
            res.status(400).json({ error: 'Error adding property', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
