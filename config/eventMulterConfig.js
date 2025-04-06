//config/eventMulterConfig.js
const multer = require('multer');

// File filter function to accept only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

// Use memory storage to store the file as a Buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;