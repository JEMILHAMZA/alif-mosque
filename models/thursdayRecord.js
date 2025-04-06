// models/thursdayRecord.js
const mongoose = require('mongoose');

const thursdayRecordSchema = new mongoose.Schema({
  fileId: { type: mongoose.Types.ObjectId, required: true },
  contentType: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true }
}, { timestamps: true });

const ThursdayRecord = mongoose.model('ThursdayRecord', thursdayRecordSchema);

module.exports = ThursdayRecord;

