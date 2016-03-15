import path from 'path';
import fs from 'fs';
import express from 'express';

import devServer from 'dev_server';

let app = express();

app.set('publicPath', '/public');

app.use(app.get('publicPath'), express.static(path.resolve('public')));
app.use(app.get('publicPath'), express.static(path.resolve('build/assets')));

app.get('/', (req, res) => {
  const publicDir = path.basename(app.get('publicPath'));
  res.sendFile(path.resolve(publicDir, 'index.html'));
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
