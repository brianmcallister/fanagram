require('dotenv').config();

var path = require('path');
var exec = require('child_process').exec;
var webpack = require('webpack');
var config = require(path.resolve('webpack.client.config'));

var env = process.env.NODE_ENV || 'development';

console.log(`Starting application in ${env} mode.`);

if (env === 'development') {
  const cmd = [
    'npm run clean',
    'nodemon src/server/server.js'
  ].join(' && ');

  // Start the client build with watch mode turned on.
  config.watch = true;

  webpack(config, function (err, stats) {
    console.log('Finished compiling `' + (config.name || 'application') + '`.');
  });

  runCommand(cmd);
}

if (env === 'production') {
  runCommand('node src/server/server.js');
}

function runCommand(cmd) {
  console.log('Running command: `' + cmd + '`');

  var command = exec(cmd);

  command.stdout.on('data', data => process.stdout.write(data));
  command.stderr.on('data', data => process.stderr.write(data));
  command.on('error', err => process.stderr.write(err));
}
