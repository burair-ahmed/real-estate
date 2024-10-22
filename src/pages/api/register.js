import dbConnect from '@/lib/db'; // Database connection
import User from '@/models/User'; // User model
import bcrypt from 'bcryptjs'; // For password hashing

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { firstname, lastname, username, email, password, confirmpassword, profilePicture } = req.body;

    // Validation
    const errors = [];
    if (!firstname || firstname.length < 2 || firstname.length > 50) {
      errors.push('First name must be between 2 and 50 characters.');
    }
    if (!lastname || lastname.length < 2 || lastname.length > 50) {
      errors.push('Last name must be between 2 and 50 characters.');
    }
    if (!username || username.length < 3 || username.length > 30) {
      errors.push('Username must be between 3 and 30 characters.');
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

    // Return errors if validation fails
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Check if the email or username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already taken.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with Base64 profile picture
    const user = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      profilePicture, 
      role: 'User', // Explicitly set the role
    });

    try {
      await user.save();
      return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}
