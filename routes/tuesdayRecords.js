// routes/tuesdayRecords.js

const express = require('express');
const router = express.Router();
const upload = require('../config/recordConfigMulter');
const TuesdayRecord = require('../models/tuesdayRecord');
const { uploadFile, deleteFile, getFileStream } = require('../utils/gridfs');

// Read all records
router.get('/', async (req, res) => {
  try {
    const records = await TuesdayRecord.find();
    res.render('tuesdayRecords', { records });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Show new record form
router.get('/new', (req, res) => {
  res.render('newTuesdayRecords');
});

// Create new record
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const fileId = await uploadFile(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      'tuesday' // Specify the bucket name
    );

    const newRecord = new TuesdayRecord({
      fileId,
      contentType: req.file.mimetype,
      description: req.body.description,
      filename: req.file.originalname
    });

    await newRecord.save();
    res.redirect('/tuesday/records');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving record');
  }
});

// Serve file from GridFS
router.get('/file/:id', async (req, res) => {
  try {
    const record = await TuesdayRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).send('Record not found');
    }

    const downloadStream = getFileStream(record.fileId, 'tuesday');
    
    downloadStream.on('error', () => {
      res.status(404).send('File not found');
    });

    res.set('Content-Type', record.contentType);
    downloadStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching file');
  }
});

// Edit record form
router.get('/edit/:id', async (req, res) => {
  try {
    const record = await TuesdayRecord.findById(req.params.id);
    res.render('editTuesdayRecords', { record });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update record
router.post('/edit/:id', upload.single('file'), async (req, res) => {
  try {
    const record = await TuesdayRecord.findById(req.params.id);
    const updateData = { description: req.body.description };

    if (req.file) {
      // Delete old file from GridFS
      await deleteFile(record.fileId, 'tuesday');

      // Upload new file
      const fileId = await uploadFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        'tuesday'
      );

      updateData.fileId = fileId;
      updateData.contentType = req.file.mimetype;
      updateData.filename = req.file.originalname;
    }

    await TuesdayRecord.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/tuesday/records');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating record');
  }
});

// Delete record
router.post('/delete/:id', async (req, res) => {
  try {
    const record = await TuesdayRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).send('Record not found');
    }

    await deleteFile(record.fileId, 'tuesday');
    await TuesdayRecord.findByIdAndDelete(req.params.id);

    res.redirect('/tuesday/records');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting record');
  }
});

module.exports = router;
