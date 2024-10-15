// models/User.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique user IDs

const userSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // Store Base64 encoded image
});

// Ensure that the userId is set when a new user is created
userSchema.pre('save', function(next) {
  if (!this.userId) {
    this.userId = uuidv4();
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
