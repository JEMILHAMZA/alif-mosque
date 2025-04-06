const express = require('express');
const router = express.Router();
const upload = require('../config/recordConfigMulter');
const ThursdayRecord = require('../models/thursdayRecord');
const { uploadFile, deleteFile, getFileStream } = require('../utils/gridfs');

// Read all records
router.get('/', async (req, res) => {
  try {
    const records = await ThursdayRecord.find();
    res.render('thursdayRecords', { records });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Show new record form
router.get('/new', (req, res) => {
  res.render('newThursdayRecords');
});

// Create new record
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');

    const fileId = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype, 'thursday');

    const newRecord = new ThursdayRecord({
      fileId,
      contentType: req.file.mimetype,
      description: req.body.description,
      filename: req.file.originalname
    });

    await newRecord.save();
    res.redirect('/thursday/records');
  } catch (err) {
    res.status(500).send('Error saving record');
  }
});

// Serve file from GridFS
router.get('/file/:id', async (req, res) => {
  try {
    const record = await ThursdayRecord.findById(req.params.id);
    if (!record) return res.status(404).send('Record not found');

    const downloadStream = getFileStream(record.fileId, 'thursday');

    downloadStream.on('error', () => res.status(404).send('File not found'));
    res.set('Content-Type', record.contentType);
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).send('Error fetching file');
  }
});

// Edit record form
router.get('/edit/:id', async (req, res) => {
  try {
    const record = await ThursdayRecord.findById(req.params.id);
    res.render('editThursdayRecords', { record });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update record
router.post('/edit/:id', upload.single('file'), async (req, res) => {
  try {
    const record = await ThursdayRecord.findById(req.params.id);
    const updateData = { description: req.body.description };

    if (req.file) {
      await deleteFile(record.fileId, 'thursday');
      const fileId = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype, 'thursday');

      updateData.fileId = fileId;
      updateData.contentType = req.file.mimetype;
      updateData.filename = req.file.originalname;
    }

    await ThursdayRecord.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/thursday/records');
  } catch (err) {
    res.status(500).send('Error updating record');
  }
});

// Delete record
router.post('/delete/:id', async (req, res) => {
  try {
    const record = await ThursdayRecord.findById(req.params.id);
    if (!record) return res.status(404).send('Record not found');

    await deleteFile(record.fileId, 'thursday');
    await ThursdayRecord.findByIdAndDelete(req.params.id);

    res.redirect('/thursday/records');
  } catch (err) {
    res.status(500).send('Error deleting record');
  }
});

module.exports = router;

