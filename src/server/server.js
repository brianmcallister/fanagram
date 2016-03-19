var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');
var express = require('express');
var session = require('express-session');
var instagram = require('instagram-node');

dotenv.config();

var devServer = require('../../tools/dev-server');

var api = instagram.instagram();
var app = express();

api.use({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

app.set('publicPath', '/public');

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  name: 'fanasess'
}));
app.use(app.get('publicPath'), express.static(path.resolve('public')));
app.use(app.get('publicPath'), express.static(path.resolve('build/assets')));
app.use((req, res, next) => {
  console.log('session', req.session);
  next();
});

app.get('/', (req, res) => {
  const publicDir = path.basename(app.get('publicPath'));
  const token = req.session.token;

  const msg = !!req.session.token
    ? 'user is logged in: ' + req.session.token
    : 'user is logged out';

  console.log('home route', msg);


  res.sendFile(path.resolve(publicDir, 'index.html'));
});

app.get('/login', (req, res) => {
  var url = api.get_authorization_url(process.env.REDIRECT_URL, {
    scope: ['basic']
  });

  res.redirect(url);
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    console.log('could not access session', err);
  });

  res.status(200).send('logged out');
});

app.get('/auth', (req, res) => {
  const code = req.query.code;

  api.authorize_user(code, process.env.REDIRECT_URL, (err, result) => {
    if (err) {
      console.log('error: ', err);
      res.status(500).send(err);
    } else {
      console.log('success', result);
      req.session.token = result.access_token;
      res.status(200).send(result);
    }
  });
});

app.get('/api/test', (req, res) => {
  const contents = fs.readFileSync(path.resolve('tools/dev_data.json'));
  res.json(JSON.parse(contents));
});

app.listen(8000, () => {
  console.log('Listening on port', 8000);
});

devServer.listen(8001, () => {
  console.log('Dev server listening on port', 8001);
});
