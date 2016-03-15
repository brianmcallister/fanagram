var path = require('path');

module.exports = {
  name: 'fanagram server',
  target: 'node',
  entry: path.resolve(__dirname, 'src/server/server.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/public/',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  resolve: {
    root: [
      path.resolve('tools')
    ],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /.jsx?$/, include: path.resolve('src'), loaders: ['babel']}
    ]
  }
};
