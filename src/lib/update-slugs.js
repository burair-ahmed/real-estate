// src/lib/update-slugs.js
const connectDB = require('./db');
const Property = require('../models/Property');
const { generateSlug } = require('./slug'); // Import the slug generation function

const updateSlugs = async () => {
    await connectDB(); // Connect to the database

    try {
        const properties = await Property.find(); // Fetch all properties

        for (const property of properties) {
            // Generate a unique slug for each property
            const uniqueSlug = await generateSlug(property.title, Property);
            property.slug = uniqueSlug; // Update the slug field
            await property.save(); // Save the updated property
            console.log(`Updated property: ${property.title}, New Slug: ${uniqueSlug}`);
        }

        console.log('All properties updated with unique slugs!');
    } catch (error) {
        console.error('Error updating slugs:', error);
    } finally {
        process.exit(); // Exit the process
    }
};

// Execute the script
updateSlugs();
