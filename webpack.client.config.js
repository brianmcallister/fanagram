var path = require('path');

module.exports = {
  name: 'fanagram client',
  entry: path.resolve(__dirname, 'src/client/client.js'),
  output: {
    path: path.resolve(__dirname, 'build/assets'),
    publicPath: '/public/',
    filename: 'client.js'
  },
  module: {
    loaders: [
      {test: /.jsx?$/, include: path.resolve('src'), loaders: ['babel']}
    ]
  }
};
