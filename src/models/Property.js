// src/models/Property.js
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },                     // Property Title
    description: { type: String, required: true },               // Property Description
    price: { type: Number, required: true },                     // Property Price
    priceAfterLabel: { type: String },                           // After Price Label (optional)
    priceBeforeLabel: { type: String },                          // Before Price Label (optional)
    yearlyTaxRate: { type: Number, required: true },             // Yearly Tax Rate
    homeownersAssociationFee: { type: Number, required: true },  // HOA Fee (monthly)
    categories: { type: [String], required: true },              // Selected Categories (Array of Strings)
    images: { type: [String], required: true },                  // Array of Image URLs
    video: { type: String },                                      // Video URL (optional)
    features: {
        area: { type: Number },                                   // Area (if applicable)
        bedrooms: { type: Number },                               // Number of Bedrooms
        rooms: { type: Number },                                  // Number of Rooms
        bathrooms: { type: Number },                              // Number of Bathrooms
        furnished: { type: Boolean },                             // Is Furnished
        airConditioned: { type: Boolean },                       // Is Air-conditioned
        view: { type: String },                                   // Description of the View
        floor: { type: String },                                  // Floor information
        direction: { type: String },                              // Direction information
        fireplace: { type: Boolean },                             // Has Fireplace
    },
    proximities: {
        bus: { type: Boolean, default: false },
        shops: { type: Boolean, default: false },
        metro: { type: Boolean, default: false },
        supermarkets: { type: Boolean, default: false },
        townCentre: { type: Boolean, default: false },
        sportsCentre: { type: Boolean, default: false },
        park: { type: Boolean, default: false },
        tgvStation: { type: Boolean, default: false },
        doctor: { type: Boolean, default: false },
        taxi: { type: Boolean, default: false },
        conventionCentre: { type: Boolean, default: false },
        highway: { type: Boolean, default: false },
        airport: { type: Boolean, default: false },
        tennis: { type: Boolean, default: false },
        sea: { type: Boolean, default: false },
        busHub: { type: Boolean, default: false },
        seaport: { type: Boolean, default: false },
        station: { type: Boolean, default: false },
        hospital: { type: Boolean, default: false },
        clinic: { type: Boolean, default: false },
        golf: { type: Boolean, default: false },
        movies: { type: Boolean, default: false },
        beach: { type: Boolean, default: false },
        publicParking: { type: Boolean, default: false },
    },
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
export default Property;
