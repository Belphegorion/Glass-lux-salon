import User from '../models/User.js';

export async function listUsers(req, res){
  const users = await User.find().lean();
  res.json(users);
}
export async function createUser(req, res){
  const user = await User.create(req.body);
  res.status(201).json(user);
}
