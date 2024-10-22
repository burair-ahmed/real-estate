// getUser.js API handler
import dbConnect from '@/lib/db';
import User from '@/models/User'; // Import User model
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  await dbConnect(); // Ensure you are connected to the database

  // Parse the cookies from the request headers
  const { token } = cookie.parse(req.headers.cookie || '');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'No token found' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database using the ID from the decoded token
    const user = await User.findById(decoded.id).select('firstname lastname email profilePicture role');

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user information including profile picture
    return res.status(200).json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profilePicture: user.profilePicture, // This is fetched separately
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(401).json({ error: 'Invalid token' });
  }
}
