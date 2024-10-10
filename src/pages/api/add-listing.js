// src/pages/api/add-listing.js
import connectDB from '../../lib/db';  // This is correct, given that db.js is in the lib folder
import Property from '../../models/Property';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
});

// Middleware to run before your API handler
const runCors = (req, res) => new Promise((resolve, reject) => {
    cors(req, res, (result) => {
        if (result instanceof Error) return reject(result);
        return resolve(result);
    });
});

export default async function handler(req, res) {
    await runCors(req, res); // Enable CORS

    await connectDB(); // Ensure you're connected to the database

    if (req.method === 'POST') {
        try {
            const propertyData = req.body; // Get property data from request body

            const newProperty = new Property(propertyData); // Create a new property instance
            await newProperty.save(); // Save the new property to the database

            res.status(201).json({ message: 'Property added successfully!', property: newProperty }); // Send success response
        } catch (error) {
            res.status(400).json({ error: 'Error adding property', details: error.message }); // Handle errors
        }
    } else {
        res.setHeader('Allow', ['POST']); // Set allowed methods
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
}
