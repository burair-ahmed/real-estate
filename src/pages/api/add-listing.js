// src/pages/api/add-listing.js
import connectDB from '../../lib/db';
import Property from '../../models/Property';

export default async function handler(req, res) {
    await connectDB(); // Ensure you're connected to the database

    if (req.method === 'POST') {
        try {
            const propertyData = req.body; // Get property data from request body
            console.log('Received property data:', propertyData); // Log incoming data

            const newProperty = new Property(propertyData); // Create a new property instance
            await newProperty.save(); // Save the new property to the database

            res.status(201).json({ message: 'Property added successfully!', property: newProperty }); // Send success response
        } catch (error) {
            console.error('Error adding property:', error);
            res.status(400).json({ error: 'Error adding property', details: error.message }); // Handle errors
        }
    } else {
        res.setHeader('Allow', ['POST']); // Set allowed methods
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
}
