//models/Event.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  teacher: { type: String, required: true },
  description: { type: String, required: true },
  dateAndDuration: { type: String, required: true },
  day: { type: String, required: true },
  imageOfBook: { type: Buffer, required: true }, // Store image as Buffer
  contentType: { type: String, required: true }, // Store content type (e.g., 'image/jpeg')
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);



