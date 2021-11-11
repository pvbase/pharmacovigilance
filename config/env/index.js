/*jshint esversion: 6 */

const path = require('path');

const env = process.env.NODE_ENV || 'local';
const config = require(`./${env}`);
const common = require(`./common`);

const defaults = {
  root: path.join(__dirname, '/..')
};

module.exports =  Object.assign(defaults,common,config);