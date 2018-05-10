'use strict';

var validate = require('@weo-edu/validate');
var Schema = require('@weo-edu/schema');

var _require = require('../utils'),
    firebaseRefObject = _require.firebaseRefObject,
    activityType = _require.activityType,
    firebaseRef = _require.firebaseRef,
    lessonTags = _require.lessonTags,
    ethnicity = _require.ethnicity,
    progress = _require.progress,
    score = _require.score,
    grade = _require.grade,
    uuid = _require.uuid,
    url = _require.url;

var properties = Schema().prop('studentAge', Schema('number').faker('random.number')).prop('studentGradeLevel', grade).prop('teacherAge', Schema('number').faker('random.number')).prop('studentEthnicity', ethnicity).prop('teacherEthnicity', ethnicity).prop('activityType', activityType).prop('lessonTags', lessonTags).required(['studentAge', 'studentGradeLevel', 'teacherAge', 'studentEthnicity', 'teacherEthnicity', 'activityType']);

var subactivity = Schema().prop('url', url).prop('type', activityType).prop('score', score).prop('started', Schema('boolean')).prop('completed', Schema('boolean')).prop('progress', progress).required(['url', 'started', 'completed', 'progress']);

var subactivities = Schema('array').items(subactivity.schema);

var activities = Schema().prop('student', firebaseRef).prop('module', firebaseRef).prop('teachers', firebaseRefObject).prop('class', firebaseRef).prop('task', firebaseRef).prop('lesson', firebaseRef).prop('moduleInstance', firebaseRef).prop('properties', properties).prop('score', score).prop('active', Schema('boolean')).prop('started', Schema('boolean')).prop('completed', Schema('boolean')).prop('progress', progress)
// .prop('subactivities', subactivities)
.prop('url', url).required(['moduleInstance', 'completed', 'progress', 'student', 'teachers', 'started', 'module', 'class', 'score', 'task', 'url']);

var add = Schema().prop('student', firebaseRef).prop('module', firebaseRef).prop('teachers', firebaseRefObject).prop('class', firebaseRef).prop('task', firebaseRef).prop('lesson', firebaseRef).prop('moduleInstance', firebaseRef).prop('score', score).prop('active', Schema('boolean')).prop('started', Schema('boolean')).prop('completed', Schema('boolean')).prop('progress', progress).prop('url', url).required(['moduleInstance', 'student', 'teachers', 'module', 'lesson', 'class', 'task', 'url']);

var setActive = Schema().prop('lesson', firebaseRef).prop('activity', firebaseRef).required(['lesson', 'activity']);

var externalUpdate = Schema().prop('completed', Schema('boolean')).prop('progress', progress).prop('score', score).prop('id', uuid);

var maybeSetCompleted = Schema().prop('activity', firebaseRef).required(['activity']);

// TODO: better name for module instance
exports.default = activities;
exports.maybeSetCompleted = validate(maybeSetCompleted);
exports.externalUpdate = validate(externalUpdate);
exports.setActive = validate(setActive);
exports.add = validate(add);