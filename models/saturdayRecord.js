// models/saturdayRecord.js
const mongoose = require('mongoose');

const saturdayRecordSchema = new mongoose.Schema({
  fileId: { type: mongoose.Types.ObjectId, required: true },
  contentType: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true }
}, { timestamps: true });

const SaturdayRecord = mongoose.model('SaturdayRecord', saturdayRecordSchema);

module.exports = SaturdayRecord;

