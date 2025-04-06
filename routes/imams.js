// routes/imams.js

const express = require('express');
const router = express.Router();
const Imam = require('../models/Imam');
const upload = require('../config/imamConfig');
const path = require('path'); 

// Get all imams
router.get('/', async (req, res) => {
  try {
    const imams = await Imam.find();
    res.render('imams', { imams });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get form to create a new imam
router.get('/new', (req, res) => {
  res.render('newImams');
});



// Create a new imam
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, title, description, twitter, facebook, instagram, linkedin, tiktok, youtube, whatsapp } = req.body;
    if (!req.file) {
      return res.status(400).send('No image uploaded');
    }

    const newImam = new Imam({
      name,
      title,
      description,
      image: req.file.buffer, // Store the image as a Buffer
      contentType: req.file.mimetype, // Store the content type
      twitter,
      facebook,
      instagram,
      linkedin,
      tiktok,
      youtube,
      whatsapp
    });

    await newImam.save();
    res.redirect('/imams');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get form to edit an imam
router.get('/edit/:id', async (req, res) => {
  try {
    const imam = await Imam.findById(req.params.id);
    res.render('editImams', { imam });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});








// Update an imam
router.post('/edit/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, title, description, twitter, facebook, instagram, linkedin, tiktok, youtube, whatsapp } = req.body;
    const updateData = { name, title, description, twitter, facebook, instagram, linkedin, tiktok, youtube, whatsapp };

    if (req.file) {
      updateData.image = req.file.buffer; // Update the image as a Buffer
      updateData.contentType = req.file.mimetype; // Update the content type
    }

    await Imam.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.redirect('/imams');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// Delete an imam
router.post('/delete/:id', async (req, res) => {
  try {
    await Imam.findByIdAndDelete(req.params.id);
    res.redirect('/imams');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



// Serve image from the database
router.get('/image/:id', async (req, res) => {
  try {
    const imam = await Imam.findById(req.params.id);
    if (!imam || !imam.image) {
      return res.status(404).send('Image not found');
    }

    // Set the Content-Type header to the image's MIME type
    res.set('Content-Type', imam.contentType);

    // Send the image buffer directly
    res.send(imam.image);
  } catch (err) {
    res.status(500).send('Error fetching image');
  }
});

module.exports = router;
