const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Secret key (you can move this to a separate config file or hardcode as needed)
const JWT_SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjI3MjU1MTM4LCJleHBpcmVzSW4iOiIxY2MwY2U0M2I0YzgwNjYwZGE5NTliZWI2NjhjNDBiZTEzYjcwZTkwMjciLCJlbmQxZGVjYWRlIjohI'

// Sign up route
router.post('/signup', async (req, res) => {
  const { name, phone, email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({
      name,
      phone,
      email,
      password,
    });

    // Save user to the database
    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
