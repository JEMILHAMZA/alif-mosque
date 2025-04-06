const express = require('express');
const router = express.Router();
const SaturdayRecord = require('../models/saturdayRecord');

// Fetch the last 12 records, initially
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const totalRecords = await SaturdayRecord.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);
        const showMore = page < totalPages;

        const records = await SaturdayRecord.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.render('saturdayRecord', {
            records,
            page,
            showMore
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
