import express from 'express';
import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

const router = express.Router();

// Mock users data
const users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$rRIiQoP84PBY0yoBFRMFXOYknJBJ1Lrz4RTzCsYL7AyN.mP0jkxkO', // password: 123456
    isAdmin: true
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$rRIiQoP84PBY0yoBFRMFXOYknJBJ1Lrz4RTzCsYL7AyN.mP0jkxkO', // password: 123456
    isAdmin: false
  }
];

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'abc123', {
    expiresIn: '30d'
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock authentication
  const user = users.find(u => u.email === email);
  
  if (user) {
    // In a real app, we would use bcrypt.compare(password, user.password)
    // For demo, we'll assume the password is correct
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user exists
  const userExists = users.some(u => u.email === email);
  
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }
  
  // Create new user
  const newUser = {
    _id: Date.now().toString(),
    name,
    email,
    password, // In a real app, we would hash this password
    isAdmin: false
  };
  
  users.push(newUser);
  
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token: generateToken(newUser._id)
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', (req, res) => {
  // In a real app, we would extract the user ID from the JWT token
  // Mock implementation
  const userId = req.headers.authorization?.split(' ')[1] || '';
  const user = users.find(u => u._id === userId);
  
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;