// config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/Admin');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const admin = await Admin.findOne({ username });
        if (!admin) return done(null, false, { message: 'Incorrect username.' });
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
        return done(null, admin);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((admin, done) => {
    done(null, admin.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await Admin.findById(id);
      done(null, admin);
    } catch (err) {
      done(err);
    }
  });
};
