import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Create a JWT token
      const token = jwt.sign(
        { 
          id: user._id, 
          firstname: user.firstname, 
          lastname: user.lastname, 
          email: user.email, 
          username: user.username
        }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Log the token before setting it in the cookie
      console.log('Setting cookie:', token);

      // Set the token in an HTTP-only cookie
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true, // Set to true for security
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        maxAge: 3600, // 1 hour expiration
        sameSite: 'lax', // Allow cookie in cross-site requests
        path: '/', // Cookie available across the site
      }));

      // Return success message only
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
