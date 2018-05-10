'use strict';

var test = require('tape');
var Ajv = require('ajv');

var _require = require('.'),
    schema = _require.schema;

var ajv = new Ajv({ allErrors: true });

var data = {
  displayName: 'student1',
  avatarUrl: 'http://www.student1image.com',
  ethnicity: 'white',
  birthDate: 564739200000,
  gender: 'male',
  assignedLesson: {
    class: 'abc1234',
    module: '432abc21',
    lesson: 'lesson1Id'
  },
  name: {
    given: 'Plickus',
    family: 'Pumpernickle'
  }
};

test('user schema', function (t) {
  var valid = ajv.validate(schema, data);
  t.equal(valid, true, ajv.errors ? JSON.stringify(ajv.errors) : 'passed');
  t.end();
});