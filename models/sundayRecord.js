// models/sundayRecord.js
const mongoose = require('mongoose');

const sundayRecordSchema = new mongoose.Schema({
  fileId: { type: mongoose.Types.ObjectId, required: true },
  contentType: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true }
}, { timestamps: true });

const SundayRecord = mongoose.model('SundayRecord', sundayRecordSchema);

module.exports = SundayRecord;

