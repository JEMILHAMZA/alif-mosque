const express = require('express');
const router = express.Router();
const upload = require('../config/recordConfigMulter');
const FridayRecord = require('../models/fridayRecord');
const { uploadFile, deleteFile, getFileStream } = require('../utils/gridfs');

router.get('/', async (req, res) => {
  try {
    const records = await FridayRecord.find();
    res.render('fridayRecords', { records });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/new', (req, res) => {
  res.render('newFridayRecords');
});

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');

    const fileId = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype, 'friday');

    const newRecord = new FridayRecord({
      fileId,
      contentType: req.file.mimetype,
      description: req.body.description,
      filename: req.file.originalname
    });

    await newRecord.save();
    res.redirect('/friday/records');
  } catch (err) {
    res.status(500).send('Error saving record');
  }
});

router.get('/file/:id', async (req, res) => {
  try {
    const record = await FridayRecord.findById(req.params.id);
    if (!record) return res.status(404).send('Record not found');

    const downloadStream = getFileStream(record.fileId, 'friday');

    downloadStream.on('error', () => res.status(404).send('File not found'));
    res.set('Content-Type', record.contentType);
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).send('Error fetching file');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const record = await FridayRecord.findById(req.params.id);
    res.render('editFridayRecords', { record });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/edit/:id', upload.single('file'), async (req, res) => {
  try {
    const record = await FridayRecord.findById(req.params.id);
    const updateData = { description: req.body.description };

    if (req.file) {
      await deleteFile(record.fileId, 'friday');
      const fileId = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype, 'friday');

      updateData.fileId = fileId;
      updateData.contentType = req.file.mimetype;
      updateData.filename = req.file.originalname;
    }

    await FridayRecord.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/friday/records');
  } catch (err) {
    res.status(500).send('Error updating record');
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const record = await FridayRecord.findById(req.params.id);
    if (!record) return res.status(404).send('Record not found');

    await deleteFile(record.fileId, 'friday');
    await FridayRecord.findByIdAndDelete(req.params.id);

    res.redirect('/friday/records');
  } catch (err) {
    res.status(500).send('Error deleting record');
  }
});

module.exports = router;


