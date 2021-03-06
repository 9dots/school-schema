'use strict';

var Schema = require('@weo-edu/schema');
var validate = require('@weo-edu/validate');

var _require = require('../utils'),
    firebaseRefObject = _require.firebaseRefObject,
    termsVersion = _require.termsVersion,
    passwordType = _require.passwordType,
    firebaseRef = _require.firebaseRef,
    displayName = _require.displayName,
    ethnicity = _require.ethnicity,
    password = _require.password,
    username = _require.username,
    grade = _require.grade,
    email = _require.email,
    uuid = _require.uuid,
    date = _require.date,
    url = _require.url;

var name = Schema().prop('given', displayName).prop('family', displayName).required(['given', 'family']);

var gender = Schema('string').enum(['male', 'female', 'other']);
var schools = Schema().prop(/^[a-zA-Z0-9]{6,}$/, Schema('string').enum(['teacher', 'student'])).others(false);

var User = Schema().prop('displayName', displayName).prop('avatarUrl', url).prop('name', name).prop('birthDate', date).prop('ethnicity', ethnicity).prop('gender', gender).prop('schools', Object.assign({}, schools.schema, { minProperties: 2 }))
// .prop('assignedLesson', assignedLesson)
.prop('splashPage', url).required(['displayName', 'avatarUrl', 'name'], 'missing_required_field');

var teacherSignUp = Schema().prop('displayName', displayName).prop('school', firebaseRef).prop('name', name).required(['displayName', 'name', 'school'], 'missing_required_field');

var createStudent = Schema().prop('school', firebaseRef).prop('grade', grade).prop('email', email).prop('name', name).required(['name', 'school', 'email'], 'missing_required_field');

var editUser = Schema().prop('username', username).prop('id', firebaseRef).prop('name', name).required(['id', 'name', 'username'], 'missing_required_field').others(false);

var createStudents = Schema('array').items(createStudent.schema);

var setCurrentSchool = Schema().prop('school', firebaseRef).required(['school'], 'missing_required_field');

var addToSchool = Schema().prop('school', firebaseRef).prop('user', firebaseRef).prop('role', Schema('string').enum(['teacher', 'student'])).required(['school'], 'missing_required_field');

var setTermsVersion = Schema().prop('uid', firebaseRef).prop('version', Schema('number'));

var setNav = Schema().prop('uid', firebaseRef).prop('class', firebaseRef);

var assignLesson = Schema().prop('lesson', uuid).prop('class', firebaseRef).prop('teachers', firebaseRefObject).prop('module', firebaseRef).required(['lesson', 'class', 'teachers', 'module']);

var setAssignedLessonIndex = Schema().prop('user', firebaseRef).prop('lesson', uuid).prop('current', Schema('number'));

var signInWithPassword = Schema().prop('user', firebaseRef).prop('password', password).prop('type', passwordType).required(['user', 'password', 'type']);

var setInsecurePassword = Schema().prop('user', firebaseRef).prop('type', passwordType).prop('password', password).required(['user', 'type']);

exports.default = User;
exports.setAssignedLessonIndex = validate(setAssignedLessonIndex);
exports.setInsecurePassword = validate(setInsecurePassword);
exports.signInWithPassword = validate(signInWithPassword);
exports.setCurrentSchool = validate(setCurrentSchool);
exports.setTermsVersion = validate(setTermsVersion);
exports.createStudents = validate(createStudents);
exports.teacherSignUp = validate(teacherSignUp);
exports.createStudent = validate(createStudent);
exports.assignLesson = validate(assignLesson);
exports.addToSchool = validate(addToSchool);
exports.editUser = validate(editUser);
exports.setNav = validate(setNav);