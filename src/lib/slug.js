// src/lib/slug.js
import { nanoid } from 'nanoid';

export const generateSlug = async (title, Property) => {
    // Generate a base slug from the title (you can also modify this to fit your needs)
    const baseSlug = title.replace(/\s+/g, '-').toLowerCase();

    // Create a unique slug using nanoid
    const uniqueSlug = `${baseSlug}-${nanoid(6)}`; // You can adjust the length as needed

    // Check for slug uniqueness in the database
    const existingProperty = await Property.findOne({ slug: uniqueSlug });
    if (existingProperty) {
        // If the slug already exists, generate a new one
        return generateSlug(title, Property);
    }

    return uniqueSlug;
};
