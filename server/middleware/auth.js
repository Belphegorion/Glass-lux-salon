// server/middleware/auth.js
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'replace_this_secret';

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next();
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id || decoded._id || decoded.userId, role: decoded.role || decoded?.role || 'user', email: decoded.email || decoded?.email };
  } catch (e) {
    console.warn('Invalid token', e?.message);
  }
  return next();
}
