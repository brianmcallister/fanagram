var path = require('path');
var webpack = require('webpack');

module.exports = {
  name: 'fanagram client',
  entry: [
    'webpack-dev-server/client?http://localhost:8001',
    'webpack/hot/only-dev-server',
    path.resolve('src/client/client.js')
  ],
  output: {
    path: path.resolve('build/assets'),
    publicPath: 'http://localhost:8001/public/',
    filename: 'client.js'
  },
  module: {
    loaders: [
      {test: /.jsx?$/, include: path.resolve('src'), loaders: ['babel']}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
