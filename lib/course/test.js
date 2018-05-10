'use strict';

var test = require('tape');
var Ajv = require('ajv');

var _require = require('.'),
    schema = _require.schema;

var ajv = new Ajv({ allErrors: true });

var data = {
  displayName: 'module1',
  description: 'This is the first module.',
  imageUrl: 'http://www.image1Url.com',
  owner: 'user12345',
  lessons: {
    lessonId: {
      displayName: 'module1-lesson1',
      description: 'first lesson for module 1',
      index: 0,
      activities: {
        activityId: {
          displayName: 'activity1',
          url: 'http://www.activty1.com',
          index: 0,
          type: 'write'
        }
      },
      tags: { coding: true }
    }
  },
  published: true,
  assigns: 4
};

test('module schema', function (t) {
  var valid = ajv.validate(schema, data);
  t.equal(valid, true, ajv.errors ? JSON.stringify(ajv.errors) : 'passed');
  t.end();
});