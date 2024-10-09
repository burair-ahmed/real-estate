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
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
export default Property;
