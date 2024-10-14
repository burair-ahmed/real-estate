import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  const { token } = cookie.parse(req.headers.cookie || '');

  if (!token) {
    return res.status(401).json({ error: 'No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ firstname: decoded.firstname });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
