const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get Users
// @access  Public
router.get('/', (req, res) => {
  User.find((err, users) => res.status(400).json({ users })).select(
    '-password'
  );
});

// @route   POST api/users
// @desc    Register a User
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for exsisting user
    const user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({ msg: 'User already exists!' });
    }

    // Create new User
    const newUser = new User({
      name,
      email,
      password
    });

    // Generate Salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    newUser.password = await bcrypt.hash(newUser.password, salt);

    // Save User
    await newUser.save();

    // Payload
    const payload = { id: newUser.id };

    // Generate JWT token
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
          }
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.send('Server Error');
  }
});

// @route   DELETE api/users
// @desc    Delete a User
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await user.remove();
    res.json({ success: true });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false });
  }
});

module.exports = router;
