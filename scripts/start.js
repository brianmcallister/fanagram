require('dotenv').config();

var exec = require('child_process').exec;
var env = process.env.NODE_ENV || 'development';
var cmd = '';

console.log(`Starting application in ${env} mode.`);

if (env === 'development') {
  cmd = 'npm run clean && npm run build-client && nodemon src/server/server.js';
}

var command = exec(cmd);

command.stdout.on('data', data => process.stdout.write(data));
command.stderr.on('data', data => process.stderr.write(data));
command.on('error', err => process.stderr.write(err));
