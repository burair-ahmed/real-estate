// models/User.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique user IDs

const userSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4, unique: true }, // Automatically generate unique user ID
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure unique email
  password: { type: String, required: true },
});

// Ensure that the userId is set when a new user is created
userSchema.pre('save', function(next) {
  if (!this.userId) {
    this.userId = uuidv4();
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
