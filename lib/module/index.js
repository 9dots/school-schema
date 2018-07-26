'use strict';

var _require = require('../utils'),
    firebaseRef = _require.firebaseRef,
    uuid = _require.uuid;

var Activity = require('../activities').default;
var validate = require('@weo-edu/validate');
var Schema = require('@weo-edu/schema');
var Course = require('../course').default;

var taskProgress = Schema().prop('score', Schema('number')).prop('progress', Schema('number')).prop('started', Schema('boolean')).prop('completed', Schema('boolean'));

// Object of user progress by user id
var userProgress = Schema().prop(/userId/, taskProgress.schema);

// Document that contains object with keys taskId
var lessonProgress = Schema().prop(/userId/, userProgress.schema);

// Collection of documents by lessonID
Schema().prop(/lessonId/, lessonProgress.schema);

var setActive = Schema().prop('module', firebaseRef).prop('lesson', uuid).prop('user', firebaseRef).prop('activity', Activity.schema).required(['module', 'lesson', 'activity']);

exports.default = Course;
exports.setActive = validate(setActive);