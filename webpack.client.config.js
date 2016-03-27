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
  resolve: {
    root: [
      path.resolve('src/client')
    ],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /.jsx?/,
        include: path.resolve('src'),
        loaders: ['eslint']
      }
    ],
    loaders: [
      {
        test: /.jsx?$/,
        include: path.resolve('src'),
        loaders: ['react-hot', 'babel']
      },
      {
        test: /.scss$/,
        include: path.resolve('src/client/stylesheets'),
        loaders: [
          'style',
          'css?modules',
          'sass'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
