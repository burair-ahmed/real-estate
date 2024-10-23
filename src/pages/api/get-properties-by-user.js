// src/pages/api/get-properties-by-user.js
import connectDB from '../../lib/db';
import Property from '../../models/Property';
import User from '../../models/User'; // Import the User model
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
    await connectDB(); // Ensure you're connected to the database

    if (req.method === 'GET') {
        try {
            // Parse the cookies from the request headers
            const { token } = cookie.parse(req.headers.cookie || '');

            // Check if the token exists
            if (!token) {
                return res.status(401).json({ error: 'No token found' });
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the user from the database using the username from the decoded token
            const username = decoded.username; // Assuming your JWT contains the username

            // Fetch the user document to ensure the username exists
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Fetch properties where the createdBy field matches the username
            const properties = await Property.find({ createdBy: username });

            if (!properties || properties.length === 0) {
                return res.status(404).json({ message: 'No properties found for this user' });
            }

            res.status(200).json({ properties }); // Return properties in response
        } catch (error) {
            console.error('Error fetching properties:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']); // Allow only GET requests
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
