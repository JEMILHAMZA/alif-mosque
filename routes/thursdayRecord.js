const express = require('express');
const router = express.Router();
const ThursdayRecord = require('../models/thursdayRecord');

// Fetch the last 12 records, initially
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const totalRecords = await ThursdayRecord.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);
        const showMore = page < totalPages;

        const records = await ThursdayRecord.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.render('thursdayRecord', {
            records,
            page,
            showMore
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
