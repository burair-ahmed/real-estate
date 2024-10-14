// /api/logout.js
export default function handler(req, res) {
    // Clear the token cookie by setting it to expire immediately
    res.setHeader('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.status(200).json({ message: 'Logout successful' });
  }
  