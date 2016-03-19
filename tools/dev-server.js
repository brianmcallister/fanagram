// Example code: https://github.com/gaearon/react-hot-boilerplate
// Troubleshooting: https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('../webpack.client.config.js');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  noInfo: true,
  hot: true,
  stats: {
    colors: true,
  },
});

module.exports = server;
