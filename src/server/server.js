import path from 'path';
import express from 'express';

let app = express();

app.set('publicPath', '/public');

app.use(app.get('publicPath'), express.static(path.resolve('public')));
app.use(app.get('publicPath'), express.static(path.resolve('build/assets')));

app.get('/', (req, res) => {
  const publicDir = path.basename(app.get('publicPath'));
  res.sendFile(path.resolve(publicDir, 'index.html'));
});

app.listen(8000, () => {
  console.log('Listening on port', 8000);
});
