import dbConnect from '@/lib/db'; // Your database connection utility
import User from '@/models/User'; // Your User model
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For token generation

export default async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Create a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Adjust token expiration as needed
      });

      return res.status(200).json({ token }); // Return the token
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    // Handle other request methods
    return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
