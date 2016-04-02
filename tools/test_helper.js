require('isomorphic-fetch');
require('babel-core/register');

var chai = require('chai');
chai.use(require('sinon-chai'));

global.expect = chai.expect;
global.sinon = require('sinon');
