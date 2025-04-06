//routes/events.js

const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const upload = require('../config/eventMulterConfig');
const path = require('path');
const { isAuthenticated } = require('../middlewares/auth');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.render('events', { events });
  } catch (err) {
    res.status(500).send('Error fetching events');
  }
});

// Render new event form
router.get('/new', (req, res) => {
  res.render('newEvent');
});

// Handle new event submission
router.post('/', upload.single('imageOfBook'), async (req, res) => {
  try {
    const { bookTitle, teacher, description, dateAndDuration, day } = req.body;
    if (!req.file) {
      return res.status(400).send('No image uploaded');
    }

    const newEvent = new Event({
      bookTitle,
      teacher,
      description,
      dateAndDuration,
      day,
      imageOfBook: req.file.buffer, // Store the image as a Buffer
      contentType: req.file.mimetype // Store the content type
    });

    await newEvent.save();
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Error adding event');
  }
});

// Render edit event form
router.get('/edit/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    res.render('editEvent', { event });
  } catch (err) {
    res.status(500).send('Error fetching event');
  }
});



// Handle edit event submission
router.post('/edit/:id', upload.single('imageOfBook'), async (req, res) => {
  try {
    const { bookTitle, teacher, description, dateAndDuration, day } = req.body;
    const updateData = { bookTitle, teacher, description, dateAndDuration, day };

    if (req.file) {
      updateData.imageOfBook = req.file.buffer; // Update the image as a Buffer
      updateData.contentType = req.file.mimetype; // Update the content type
    }

    await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Error updating event');
  }
});

// Handle delete event
router.post('/delete/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Error deleting event');
  }
});







// Serve image from the database
router.get('/image/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || !event.imageOfBook) {
      return res.status(404).send('Image not found');
    }

    // Set the Content-Type header to the image's MIME type
    res.set('Content-Type', event.contentType);

    // Send the image buffer directly
    res.send(event.imageOfBook);
  } catch (err) {
    res.status(500).send('Error fetching image');
  }
});


module.exports = router;

