'use strict';

var _require = require('../course'),
    Course = _require.default,
    lesson = _require.lesson;

var validate = require('@weo-edu/validate');
var Schema = require('@weo-edu/schema');

var _require2 = require('../utils'),
    firebaseRefObject = _require2.firebaseRefObject,
    passwordType = _require2.passwordType,
    displayName = _require2.displayName,
    firebaseRef = _require2.firebaseRef,
    grade = _require2.grade,
    uuid = _require2.uuid;

var moduleRefObject = Schema().prop(/^.*$/, Course).others(false, 'invalid_keys');

var totalStat = Schema().prop('score', Schema('number').faker('random.number')).prop('started', Schema('number').faker('random.number')).prop('completed', Schema('number').faker('random.number')).prop('progress', Schema('number').faker('random.number'));

var stats = Schema().prop('task', firebaseRef).prop('module', firebaseRef).prop('lesson', firebaseRef).prop('totals', totalStat).required(['activity', 'lesson', 'module']);

var statsObject = Schema().prop(/^[a-zA-Z]{6,}$/, stats.schema).others(false);

// XXX: Stats is a subcollection. Not sure how to document this yet.
var Class = Schema().prop('displayName', displayName).prop('grade', grade).prop('assignedLesson', lesson).prop('school', firebaseRef).prop('owner', firebaseRef).prop('modules', Object.assign({}, moduleRefObject.schema, { minProperties: 2 })).prop('teachers', firebaseRefObject).prop('students', firebaseRefObject).prop('members', firebaseRefObject).prop('stats', statsObject).prop('passwordType', passwordType).others(false).required(['displayName', 'grade', 'school', 'owner']);

var createClass = Schema().prop('displayName', displayName).prop('grade', grade).prop('school', firebaseRef).prop('uid', firebaseRef).others(false, 'invalid_fields').required(['displayName', 'grade', 'school'], 'missing_required_field');

var addStudent = Schema().prop('class', firebaseRef).prop('student', firebaseRef).prop('role', Schema('string').enum(['teacher', 'student'])).others(false, 'invalid_fields').required(['class', 'student'], 'missing_required_field');

var addStudents = Schema().prop('class', firebaseRef).prop('students', Schema('array').items(firebaseRef.schema).min(1)).others(false, 'invalid_fields').required(['class', 'students'], 'missing_required_field');

var addTeacher = Schema().prop('class', firebaseRef).prop('teacher', firebaseRef).others(false, 'invalid_fields').required(['class'], 'missing_required_field');

var removeTeacher = Schema().prop('class', firebaseRef).prop('teacher', firebaseRef).others(false, 'invalid_fields').required(['class'], 'missing_required_field');

var removeStudent = Schema().prop('class', firebaseRef).prop('student', firebaseRef).others(false, 'invalid_fields').required(['class', 'student'], 'missing_required_field');

var removeStudents = Schema().prop('class', firebaseRef).prop('students', Schema('array').items(firebaseRef.schema).min(1)).others(false, 'invalid_fields').required(['class', 'students'], 'missing_required_field');

var addCourse = Schema().prop('class', firebaseRef).prop('course', firebaseRef).required(['class', 'course'], 'missing_required_field').others(false, 'invalid_fields');

var assignLesson = Schema().prop('lesson', uuid).prop('class', firebaseRef).prop('module', firebaseRef).prop('student', firebaseRef).required(['lesson', 'class']);

var setPasswordType = Schema().prop('class', firebaseRef).prop('passwordType', passwordType).required(['class', 'passwordType']);

var updateDetails = Schema().prop('class', firebaseRef).prop('displayName', displayName).prop('grade', grade).required(['class', 'displayName', 'grade']);

exports.default = Class;
exports.setPasswordType = validate(setPasswordType);
exports.removeStudents = validate(removeStudents);
exports.updateDetails = validate(updateDetails);
exports.removeStudent = validate(removeStudent);
exports.removeTeacher = validate(removeTeacher);
exports.assignLesson = validate(assignLesson);
exports.addStudents = validate(addStudents);
exports.createClass = validate(createClass);
exports.addTeacher = validate(addTeacher);
exports.addStudent = validate(addStudent);
exports.addCourse = validate(addCourse);