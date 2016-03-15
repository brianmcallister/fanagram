import path from 'path';
import express from 'express';

let app = express();

app.set('publicPath', path.resolve('public'));

app.use(app.get('publicPath'), express.static('public'));
app.use(app.get('publicPath'), express.static('build/assets'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(app.get('publicPath'), 'index.html'));
});

app.listen(8000, () => {
  console.log('Listening on port', 8000);
});
