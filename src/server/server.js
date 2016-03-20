require('dotenv').config()

var path = require('path');
var fs = require('fs');
var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
var passport = require('passport');
var InstragramStrategy = require('passport-instagram');
var instagram = require('instagram-node');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new InstragramStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.REDIRECT_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

var api = instagram.instagram();
var app = express();
var auth = require('./middleware/auth');

app.set('publicPath', '/public');
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('combined'));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  name: 'fanasess'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.get('publicPath'), express.static(path.resolve('public')));
app.use(app.get('publicPath'), express.static(path.resolve('build/assets')));

app.get('/', (req, res) => {
  console.log('user is logged in', req.isAuthenticated());
  const state = {
    loggedIn: req.isAuthenticated()
  };

  res.render('index', { state: JSON.stringify(state) });
});

app.get('/auth/instagram', passport.authenticate('instagram'));
app.get('/auth', passport.authenticate('instagram', {
  failureRedirect: '/asdfasdf'
}), (req, res) => {
  console.log('authenticated');
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/api/test', (req, res) => {
  const contents = fs.readFileSync(path.resolve('tools/dev_data.json'));

  const resp = {
    loggedIn: req.isAuthenticated()
  };

  res.json(resp);
});

app.listen(8000, () => {
  console.log('Listening on port', 8000);
});

if (process.env.NODE_ENV === 'development') {
  var devServer = require('../../tools/dev-server');

  devServer.listen(8001, () => {
    console.log('Dev server listening on port', 8001);
  });
}
