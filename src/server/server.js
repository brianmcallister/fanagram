import path from 'path';
import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import instagram from 'instagram-node';
import cookieParser from 'cookie-parser';

dotenv.config();

import devServer from 'dev_server';

let api = instagram.instagram();
let app = express();

api.use({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

app.set('publicPath', '/public');

app.use(cookieParser(process.env.SECRET_KEY));
app.use(app.get('publicPath'), express.static(path.resolve('public')));
app.use(app.get('publicPath'), express.static(path.resolve('build/assets')));
app.use((req, res, next) => {
  console.log('received request', req.originalUrl);
  console.log('cookies', req.cookies, req.signedCookies);
  next();
});

app.get('/', (req, res) => {
  const publicDir = path.basename(app.get('publicPath'));
  res.sendFile(path.resolve(publicDir, 'index.html'));
});

app.get('/login', (req, res) => {
  let url = api.get_authorization_url(process.env.REDIRECT_URL, {
    scope: ['basic']
  });

  res.redirect(url);
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
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
      res.cookie('token', result.access_token, {
        signed: true,
        httpOnly: true
      });

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
