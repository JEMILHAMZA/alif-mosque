// models/mondayRecord.js
const mongoose = require('mongoose');

const mondayRecordSchema = new mongoose.Schema({
  fileId: { type: mongoose.Types.ObjectId, required: true },
  contentType: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true }
}, { timestamps: true });

const MondayRecord = mongoose.model('MondayRecord', mondayRecordSchema);

module.exports = MondayRecord;
