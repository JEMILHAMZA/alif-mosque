const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// Get all announcements with pagination
router.get('/', async (req, res) => {
  const limit = 8;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  try {
    const totalAnnouncements = await Announcement.countDocuments();
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const showMore = (page * limit) < totalAnnouncements;

    if (req.xhr) {
      res.render('announcement', { announcements, page, showMore, layout: false });
    } else {
      res.render('announcement', { announcements, page, showMore });
    }
    
  } catch (err) {
    res.status(500).send('Error fetching announcements');
  }
});

module.exports = router;


