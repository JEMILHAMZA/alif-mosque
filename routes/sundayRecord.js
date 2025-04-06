const express = require('express');
const router = express.Router();
const SundayRecord = require('../models/sundayRecord');

// Fetch the last 12 records, initially
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const totalRecords = await SundayRecord.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);
        const showMore = page < totalPages;

        const records = await SundayRecord.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.render('sundayRecord', {
            records,
            page,
            showMore
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
