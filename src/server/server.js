require('dotenv').config()

var path = require('path');
var fs = require('fs');
var express = require('express');
var session = require('express-session');
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
  console.log('access', accessToken);
  console.log('refresh', refreshToken);
  console.log('profile', profile);
  return done(null, profile);
}));

var api = instagram.instagram();
var app = express();
var auth = require('./middleware/auth');


app.set('publicPath', '/public');
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
  const publicDir = path.basename(app.get('publicPath'));
  res.sendFile(path.resolve(publicDir, 'index.html'));
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
  res.json(JSON.parse(contents));
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
