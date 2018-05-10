'use strict';

var Schema = require('@weo-edu/schema');
var validate = require('@weo-edu/validate');

var _require = require('../utils'),
    firebaseRefObject = _require.firebaseRefObject,
    displayName = _require.displayName,
    firebaseRef = _require.firebaseRef,
    url = _require.url;

var School = Schema().prop('imageUrl', url).prop('displayName', displayName).prop('classes', firebaseRefObject).prop('teachers', firebaseRefObject).prop('students', firebaseRefObject).required(['displayName']).others(false);

var create = Schema().prop('imageUrl', url).prop('displayName', displayName).required(['displayName'], 'missing_required_field').others(false, 'invalid_keys');

var addTeacher = Schema().prop('school', firebaseRef).prop('teacher', firebaseRef).required(['school', 'teacher'], 'missing_required_field').others(false, 'invalid_keys');

var removeTeacher = Schema().prop('school', firebaseRef).prop('teacher', firebaseRef).required(['school', 'teacher'], 'missing_required_field').others(false, 'invalid_keys');

exports.default = School;
exports.create = validate(create);
exports.addTeacher = validate(addTeacher);
exports.removeTeacher = validate(removeTeacher);