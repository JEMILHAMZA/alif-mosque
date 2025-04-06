// routes/mondayRecord.js
const express = require('express');
const router = express.Router();
const FridayRecord = require('../models/fridayRecord');

// Fetch the last 12 records, initially
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const totalRecords = await FridayRecord.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);
        const showMore = page < totalPages;

        const records = await FridayRecord.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.render('fridayRecord', {
            records,
            page,
            showMore
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
