// routes/announcements.js

const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const upload = require('../config/announcementMulterConfig');
const { isAuthenticated } = require('../middlewares/auth');

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.render('announcements', { announcements });
  } catch (err) {
    res.status(500).send('Error fetching announcements');
  }
});

// Render new announcement form
router.get('/new', isAuthenticated,(req, res) => {
  res.render('newAnnouncement');
});

// Handle new announcement submission
router.post('/',isAuthenticated, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No image uploaded');
    }

    const newAnnouncement = new Announcement({
      image: req.file.buffer, // Store the image as a Buffer
      contentType: req.file.mimetype // Store the content type
    });

    await newAnnouncement.save();
    res.redirect('/announcements');
  } catch (err) {
    res.status(500).send('Error adding announcement');
  }
});

// Render edit announcement form
router.get('/edit/:id',isAuthenticated, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).send('Announcement not found');
    res.render('editAnnouncement', { announcement });
  } catch (err) {
    res.status(500).send('Error fetching announcement');
  }
});

// Handle edit announcement submission
router.post('/edit/:id',isAuthenticated, upload.single('image'), async (req, res) => {
  try {
    const updateData = {};
    if (req.file) {
      updateData.image = req.file.buffer; // Update the image as a Buffer
      updateData.contentType = req.file.mimetype; // Update the content type
    }

    await Announcement.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.redirect('/announcements');
  } catch (err) {
    res.status(500).send('Error updating announcement');
  }
});

// Handle delete announcement
router.post('/delete/:id',isAuthenticated, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.redirect('/announcements');
  } catch (err) {
    res.status(500).send('Error deleting announcement');
  }
});


// routes/announcements.js

// Serve image from the database
router.get('/image/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement || !announcement.image) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', announcement.contentType);
    res.send(announcement.image);
  } catch (err) {
    res.status(500).send('Error fetching image');
  }
});

module.exports = router;



  
  










