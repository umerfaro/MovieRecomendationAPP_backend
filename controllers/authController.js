// controllers/authController.js

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// User Registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: 'Login failed', error: err.message });
  }
};
