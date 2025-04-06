// models/Announcement.js

const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  image: { type: Buffer, required: true }, // Store image as Buffer
  contentType: { type: String, required: true }, // Store content type (e.g., 'image/png')
  createdAt: { type: Date, default: Date.now } // Automatically set to current date and time
});

module.exports = mongoose.model('Announcement', announcementSchema);


