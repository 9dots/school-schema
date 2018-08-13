'use strict';

var _require = require('../course'),
    Course = _require.default,
    task = _require.task;

var _require2 = require('../activities'),
    Activity = _require2.default;

var _require3 = require('../utils'),
    firebaseRef = _require3.firebaseRef,
    uuid = _require3.uuid;

var validate = require('@weo-edu/validate');
var Schema = require('@weo-edu/schema');

var taskProgress = Schema().prop('score', Schema('number')).prop('progress', Schema('number')).prop('started', Schema('boolean')).prop('completed', Schema('boolean'));

// Object of user progress by user id
var userProgress = Schema().prop(/userId/, taskProgress.schema);

// Document that contains object with keys taskId
var lessonProgress = Schema().prop(/userId/, userProgress.schema);

// Collection of documents by lessonID
Schema().prop(/lessonId/, lessonProgress.schema);

var setActive = Schema().prop('module', firebaseRef).prop('lesson', uuid).prop('user', firebaseRef).prop('activity', Activity.schema).required(['module', 'lesson', 'activity']);

var getTaskTeacherView = Schema().prop('task', task.schema).required(['task']);

exports.default = Course;
exports.setActive = validate(setActive);
exports.getTaskTeacherView = validate(getTaskTeacherView);