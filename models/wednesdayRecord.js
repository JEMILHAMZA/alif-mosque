// models/wednesdayRecord.js
const mongoose = require('mongoose');

const wednesdayRecordSchema = new mongoose.Schema({
  fileId: { type: mongoose.Types.ObjectId, required: true },
  contentType: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true }
}, { timestamps: true });

const WednesdayRecord = mongoose.model('WednesdayRecord', wednesdayRecordSchema);

module.exports = WednesdayRecord;
