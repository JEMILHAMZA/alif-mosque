const express = require('express');
const passport = require('passport');
const Admin = require('../models/Admin');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');

// Render registration form
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle admin registration
router.post('/register',async (req, res) => {
  try {
    const { username, password } = req.body;
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.redirect('/admin/login');
  } catch (err) {
    res.status(500).send('Error registering admin');
  }
});

// Render login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle admin login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin/dashboard',
  failureRedirect: '/admin/login',
  failureFlash: true
}));

// Admin dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard');
});

module.exports = router;

