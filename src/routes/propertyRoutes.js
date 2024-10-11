// src/routes/propertyRoutes.js
import express from 'express';
import Property from '../models/Property.js';

const router = express.Router();

// Route to create a new property
router.post('/add-listing', async (req, res) => {
    try {
        const propertyData = req.body; // Ensure your frontend sends data in the expected format
        const newProperty = new Property(propertyData);
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating property', error });
    }
});

export default router;
