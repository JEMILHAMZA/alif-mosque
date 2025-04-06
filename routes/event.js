const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Import your Event model

// Route to fetch events and render the user view
router.get('/', async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.render('event', { events }); // Render the events page with the fetched events
  } catch (err) {
    res.status(500).send('Error fetching events');
  }
});

module.exports = router;
