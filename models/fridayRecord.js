// models/fridayRecord.js
const mongoose = require('mongoose');

const fridayRecordSchema = new mongoose.Schema({
  fileId: { type: mongoose.Types.ObjectId, required: true },
  contentType: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true }
}, { timestamps: true });

const FridayRecord = mongoose.model('FridayRecord', fridayRecordSchema);

module.exports = FridayRecord;

