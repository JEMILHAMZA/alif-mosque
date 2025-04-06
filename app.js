require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const adminRoutes = require('./routes/admin');
const announcementRoutes = require('./routes/announcements');
const announcementRoute = require('./routes/announcement');
const homeAnnouncementRoute = require('./routes/homeAnnouncement');
const eventRoutes = require('./routes/events');
const eventRoute = require('./routes/event');
const imamRoutes = require('./routes/imams');
const imamRoute = require('./routes/imam');
const mondayRecordsRoutes = require('./routes/mondayRecords');
const tuesdayRecordsRoutes = require('./routes/tuesdayRecords');
const wednesdayRecordsRoutes = require('./routes/wednesdayRecords');
const thursdayRecordsRoutes = require('./routes/thursdayRecords');
const saturdayRecordsRoutes = require('./routes/saturdayRecords');
const fridayRecordsRoutes = require('./routes/fridayRecords');
const sundayRecordsRoutes = require('./routes/sundayRecords');

const mondayRecordRoute = require('./routes/mondayRecord');
const tuesdayRecordRoute = require('./routes/tuesdayRecord');
const wednesdayRecordRoute = require('./routes/wednesdayRecord');
const thursdayRecordRoute = require('./routes/thursdayRecord');
const saturdayRecordRoute = require('./routes/saturdayRecord');
const fridayRecordRoute = require('./routes/fridayRecord');
const sundayRecordRoute = require('./routes/sundayRecord');

// const contactRoutes = require('./routes/contact');
const messageRoutes = require('./routes/message');

const passportConfig = require('./config/passport');
const fs = require('fs');
const path = require('path');
const { isAuthenticated } = require('./middlewares/auth');

const app = express();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Directory paths
// const announcementUploadDir = path.join(__dirname, 'uploads', 'announcements');
// const eventUploadDir = path.join(__dirname, 'uploads', 'events');
// const recordUploadDir = path.join(__dirname, 'uploads', 'records');
// const imamUploadDir = path.join(__dirname, 'uploads', 'imams');

// // Create directories if they don't exist
// if (!fs.existsSync(announcementUploadDir)) {
//   fs.mkdirSync(announcementUploadDir, { recursive: true });
// }

// if (!fs.existsSync(eventUploadDir)) {
//   fs.mkdirSync(eventUploadDir, { recursive: true });
// }
// if (!fs.existsSync(recordUploadDir)) {
//   fs.mkdirSync(recordUploadDir, { recursive: true });
// }

// if (!fs.existsSync(imamUploadDir)) {
//   fs.mkdirSync(imamUploadDir, { recursive: true });
// }

// app.use('/uploads/announcements', express.static(announcementUploadDir));
// app.use('/uploads/events', express.static(eventUploadDir));
// app.use('/uploads/records', express.static(recordUploadDir));
// app.use('/uploads/imams', express.static(imamUploadDir));

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true, 
  saveUninitialized: false,
  cookie: { maxAge: 5 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport config
passportConfig(passport);

// Routes
app.use('/admin', adminRoutes);
app.use('/announcements', announcementRoutes);
app.use('/events', eventRoutes);
app.use('/imams', imamRoutes);
app.use('/monday/records', mondayRecordsRoutes);
app.use('/tuesday/records', tuesdayRecordsRoutes);
app.use('/wednesday/records', wednesdayRecordsRoutes);
app.use('/thursday/records',thursdayRecordsRoutes);
app.use('/saturday/records', saturdayRecordsRoutes);
app.use('/friday/records',fridayRecordsRoutes);
app.use('/sunday/records', sundayRecordsRoutes);



// Root route handler
// app.get('/', (req, res) => {
//   res.render('home');
// });
app.use('/', homeAnnouncementRoute);
// Other routes...
app.get('/about', (req, res) => res.render('about'));
app.get('/services', (req, res) => res.render('services'));
app.get('/donation', (req, res) => res.render('donation'));
app.get('/contact', (req, res) => res.render('contact'));
// app.use('/contact', contactRoutes);
app.use('/message', messageRoutes);
// app.get('/event', (req, res) => res.render('event'));
// app.get('/imams', (req, res) => res.render('imams'));
app.use('/imam', imamRoute);
// app.get('/announcement', (req, res) => res.render('announcement'));
app.use('/announcement', announcementRoute);
app.use('/event', eventRoute);
app.use('/mondayrecords', mondayRecordRoute);
app.use('/tuesdayrecords', tuesdayRecordRoute);
app.use('/wednesdayrecords', wednesdayRecordRoute);
app.use('/thursdayrecords', thursdayRecordRoute);
app.use('/saturdayrecords', saturdayRecordRoute);
app.use('/sundayrecords', sundayRecordRoute);
app.use('/fridayrecords', fridayRecordRoute);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
