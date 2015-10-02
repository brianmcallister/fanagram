var path = require('path');

module.exports = {
  entry: {
    app: ['./app/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/public/',
    filename: 'bundle.js'
  }
};
