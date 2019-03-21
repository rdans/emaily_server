const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); //1st argument is error msg, 2nd arg is object id in mongodb
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser){
        // had profile
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id}).save();
      done(null, user);
  }
));
