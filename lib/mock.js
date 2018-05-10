'use strict';

var jsf = require('json-schema-faker');

jsf.option({ alwaysFakeOptionals: true });
jsf.extend('faker', function () {
  return require('faker');
});

module.exports = function (schema) {
  return jsf.resolve(schema);
};