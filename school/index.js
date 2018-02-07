const Schema = require('@weo-edu/schema')
const validate = require('@weo-edu/validate')
const mock = require('../mock')
const { firebaseRefObject, displayName, firebaseRef, url } = require('../utils')

const School = Schema()
  .prop('imageUrl', url)
  .prop('displayName', displayName)
  .prop('classes', firebaseRefObject)
  .prop('teachers', firebaseRefObject)
  .prop('students', firebaseRefObject)
  .required(['displayName'])
  .others(false)

const create = Schema()
  .prop('imageUrl', url)
  .prop('displayName', displayName)
  .prop('uid', firebaseRef)
  .required(['displayName', 'uid'], 'missing_required_field')
  .others(false, 'invalid_keys')

const addTeacher = Schema()
  .prop('uid', firebaseRef)
  .prop('school', firebaseRef)
  .prop('teacher', firebaseRef)
  .required(['school', 'uid', 'teacher'], 'missing_required_field')
  .others(false, 'invalid_keys')

const removeTeacher = Schema()
  .prop('uid', firebaseRef)
  .prop('school', firebaseRef)
  .prop('teacher', firebaseRef)
  .required(['school', 'uid', 'teacher'], 'missing_required_field')
  .others(false, 'invalid_keys')

exports.default = School
exports.create = validate(create)
exports.addTeacher = validate(addTeacher)
exports.removeTeacher = validate(removeTeacher)
