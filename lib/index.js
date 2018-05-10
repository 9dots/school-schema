'use strict';

var mock = require('./mock');
var map = require('@f/map');

var schemas = {
  activity: require('./activities'),
  module: require('./module'),
  course: require('./course'),
  school: require('./school'),
  class: require('./class'),
  user: require('./user')
};

var mocks = map(function (val, key) {
  return mock(val.default.schema);
}, schemas);

module.exports = schemas;
schemas.mock = mocks;
schemas.picturePasswords = require('./picturePasswords');