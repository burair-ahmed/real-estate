// src/pages/api/test.js
export default function handler(req, res) {
    // Respond with a JSON object
    res.status(200).json({ message: 'Hello, this is a test API!', success: true });
  }
  