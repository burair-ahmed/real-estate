// src/pages/api/changepassword/changePassword.js
import dbConnect from '../../../lib/db'; // Adjust the import based on your project structure
import User from '../../../models/User'; // Ensure the path to your User model is correct
import bcrypt from 'bcryptjs'; // For hashing passwords
import jwt from 'jsonwebtoken'; // For decoding JWT

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect(); // Ensure the database is connected

  // Get the token from the cookie
  const { token } = req.cookies; // Assuming you're storing the token in cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Decode the token to get user data
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(decoded.id); // Use decoded ID from JWT

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword; // Update the user's password

    await user.save(); // Save the updated user

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
