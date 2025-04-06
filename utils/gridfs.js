// utils/gridfs.js

const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const { Readable } = require('stream');

// Object to hold all our GridFS buckets
const buckets = {};

mongoose.connection.once('open', () => {
  // Initialize buckets for each day of the week
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  days.forEach(day => {
    buckets[day] = new GridFSBucket(mongoose.connection.db, {
      bucketName: `${day}Records`
    });
  });
});

const uploadFile = (fileBuffer, filename, contentType, day) => {
  return new Promise((resolve, reject) => {
    const uploadStream = buckets[day].openUploadStream(filename, {
      contentType: contentType
    });
    
    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream)
      .on('error', reject)
      .on('finish', () => resolve(uploadStream.id));
  });
};

const deleteFile = (fileId, day) => {
  return buckets[day].delete(fileId);
};

const getFileStream = (fileId, day) => {
  return buckets[day].openDownloadStream(fileId);
};

module.exports = {
  uploadFile,
  deleteFile,
  getFileStream
};