const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate User
// @access  Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    // Check that email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid Email' });
    }

    // Compare password hashes
    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      // Send json web token
      const payload = { id: user.id };
      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      });
    } else {
      res.status(401).json({ msg: 'Invalid Password!' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
