'use strict';

var test = require('tape');
var Ajv = require('ajv');

var _require = require('.'),
    schema = _require.schema;

var ajv = new Ajv({ allErrors: true });

var data = {
  displayName: 'jam',
  imageUrl: 'http://www.schoolImage.com',
  classes: {
    abc123: true
  },
  teachers: {
    abacsdf123: true
  },
  students: {
    student123: true
  }
};

test('school schema', function (t) {
  var valid = ajv.validate(schema, data);
  t.equal(valid, true, ajv.errors ? JSON.stringify(ajv.errors) : 'passed');
  t.end();
});