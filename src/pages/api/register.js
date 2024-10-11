import dbConnect from '@/lib/db'; // Import your database connection utility
import User from '@/models/User'; // Import your User model
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

export default async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method === 'POST') {
    const { firstname, lastname, email, password, confirmpassword } = req.body;

    // Validate inputs
    const errors = [];
    if (!firstname || firstname.length < 2 || firstname.length > 50) {
      errors.push('First name is required and must be between 2 and 50 characters.');
    }
    if (!lastname || lastname.length < 2 || lastname.length > 50) {
      errors.push('Last name is required and must be between 2 and 50 characters.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('A valid email is required.');
    }
    if (!password || password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (password !== confirmpassword) {
      errors.push('Passwords do not match.');
    }

    // If there are errors, respond with the errors
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    try {
      await user.save(); // Attempt to save the user
      return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        return res.status(400).json({ error: 'Email already registered.' });
      }
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}
