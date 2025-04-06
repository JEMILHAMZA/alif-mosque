// models/Imam.js
const mongoose = require('mongoose');

const ImamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: Buffer, required: true }, // Store image as Buffer
  contentType: { type: String, required: true }, // Store content type (e.g., 'image/jpeg')
  twitter: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  tiktok: { type: String },
  youtube: { type: String },
  whatsapp: { type: String }
});

module.exports = mongoose.model('Imam', ImamSchema);


