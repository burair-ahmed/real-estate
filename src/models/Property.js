// src/models/Property.js
import mongoose from 'mongoose';

const categoryEnum = ['Apartment', 'Villa', 'Mansion', 'Chalet', 'Land', 'Townhouse', 'Business Premise', 'Office'];
const propertytypeEnum = ['Buy', 'Rent', 'Development', 'Sold'];

const propertySchema = new mongoose.Schema({
    propertyid: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    priceAfterLabel: { type: String },
    priceBeforeLabel: { type: String },
    categories: { type: [String], enum: categoryEnum, required: true },
    propertytype: { type: [String], enum: propertytypeEnum, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    zipCode: { type: String, required: true },
    images: { type: [String], required: true },
    video: { type: String },
    features: {
        area: { type: Number },
        bedrooms: { type: Number },
        rooms: { type: Number },
        bathrooms: { type: Number },
        furnished: { type: Boolean },
        airConditioned: { type: Boolean },
        view: { type: String },
        floor: { type: String },
        direction: { type: String },
        fireplace: { type: Boolean },
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
    slug: { type: String, unique: true },
    createdBy: { type: String, required: true }, // Add this field to track the user who created the property
}, { timestamps: true });

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
export default Property;
