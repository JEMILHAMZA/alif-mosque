// models/tuesdayRecord.js
const mongoose = require('mongoose');

const tuesdayRecordSchema = new mongoose.Schema({
  fileId: { type: mongoose.Types.ObjectId, required: true },
  contentType: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true }
}, { timestamps: true });

const TuesdayRecord = mongoose.model('TuesdayRecord', tuesdayRecordSchema);

module.exports = TuesdayRecord;
