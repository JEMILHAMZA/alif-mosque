// config/multerConfig.js

const multer = require('multer');
const path = require('path');

// File filter function to accept only image files and PDF files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and pdfs are allowed.'), false);
  }
};

// Use memory storage to store the file as a Buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;

