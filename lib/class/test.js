'use strict';

var test = require('tape');
var Ajv = require('ajv');

var _require = require('.'),
    schema = _require.schema;

var ajv = new Ajv({ allErrors: true });

var data = {
  displayName: 'class1',
  grade: '5',
  school: 'abc123',
  owner: 'user1',
  stats: {
    firstStat: {
      activityId: 'firstActivity',
      moduleInstance: 'uniqueId12345',
      totals: {
        score: 86,
        started: 15,
        completed: 5,
        progress: 50
      }
    }
  },
  modules: {
    uniqueId12345: {
      moduleRef: 'abc12356',
      active: true
    }
  },
  students: {
    abc123: true
  },
  teachers: {
    abacsdf123: true
  }
};

test('class schema', function (t) {
  var valid = ajv.validate(schema, data);
  t.equal(valid, true, ajv.errors ? JSON.stringify(ajv.errors) : 'passed');
  t.end();
});