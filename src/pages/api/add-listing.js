// src/pages/api/add-listing.js
import connectDB from '../../lib/db';
import Property from '../../models/Property';
import { nanoid } from 'nanoid'; // Import nanoid for generating slugs
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    await connectDB(); // Ensure you're connected to the database

    if (req.method === 'POST') {
        try {
            const { token } = req.cookies; // Get the JWT token from cookies

            if (!token) {
                return res.status(401).json({ error: 'Unauthorized. No token provided.' });
            }

            // Verify the token and extract user data
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const username = decodedToken.username; // Extract the username from the token

            const propertyData = req.body; // Get property data from request body
            console.log('Received property data:', propertyData); // Log incoming data

            // Generate the slug from the property title
            const slugBase = propertyData.title.toLowerCase().replace(/\s+/g, '-'); // Create a base slug
            propertyData.slug = `${slugBase}-${nanoid(6)}`; // Append a unique ID to avoid duplicates

            // Add the createdBy field with the username from the token
            propertyData.createdBy = username;

            // Create a new property instance
            const newProperty = new Property(propertyData); 
            await newProperty.save(); // Save the new property to the database

            res.status(201).json({ message: 'Property added successfully!', property: newProperty });
        } catch (error) {
            console.error('Error adding property:', error);
            res.status(400).json({ error: 'Error adding property', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']); // Set allowed methods
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
}
