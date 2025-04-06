const express = require('express');
const router = express.Router();
const Imam = require('../models/Imam');

// Route to get all imams
router.get('/', async (req, res) => {
  try {
    const imams = await Imam.find(); // Fetch all imams from the database
    res.render('imam', { imams }); // Render the 'imam.ejs' template and pass imams data
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
