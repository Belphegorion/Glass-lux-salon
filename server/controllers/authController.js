import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'replace_this_secret';

export async function register(req, res){
  const { firstName, lastName, email, password, phone, dateOfBirth, profilePhoto, preferences, termsAccepted } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existing = await User.findOne({ email });
  if(existing) return res.status(409).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ 
    firstName, 
    lastName, 
    email, 
    phone, 
    dateOfBirth, 
    password: hash, 
    profilePhoto,
    preferences,
    termsAccepted
  });
  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ 
    token, 
    user: { 
      id: user._id, 
      firstName: user.firstName, 
      lastName: user.lastName, 
      email: user.email, 
      role: user.role,
      profilePhoto: user.profilePhoto
    } 
  });
}

export async function login(req, res){
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ 
    token, 
    user: { 
      id: user._id, 
      firstName: user.firstName, 
      lastName: user.lastName, 
      email: user.email, 
      role: user.role,
      profilePhoto: user.profilePhoto
    } 
  });
}
