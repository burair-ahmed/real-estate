import dbConnect from '@/lib/db'; // Database connection
import User from '@/models/User'; // User model

export default async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method === 'PUT') { // Handle PUT requests
    const { userId, newRole } = req.body;

    // Check if the new role is valid
    const validRoles = ['SuperAdmin', 'Admin', 'Agent', 'User'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    try {
      // Update the user's role
      const updatedUser = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
      return res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
