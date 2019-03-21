const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoute');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');


mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days into milisecond
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routhe handle
/*
app.get('/', (req, res) => {
  res.send({bye: 'buddy'});
});
*/

authRoutes(app);
require('./routes/billingRoutes')(app);
//or you can do require('./routes/authRoute')(app);

const PORT = process.env.PORT || 5000; //see and wait for heroku determine what port to use (dynamic binding port)
app.listen(PORT);
