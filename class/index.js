const Schema = require('@weo-edu/schema')
const validate = require('@weo-edu/validate')
const { default: Course, lesson } = require('../course')
const {
  firebaseRefObject,
  displayName,
  firebaseRef,
  grade,
  uuid
} = require('../utils')

const moduleRefObject = Schema()
  .prop(/^.*$/, Course)
  .others(false, 'invalid_keys')

const totalStat = Schema()
  .prop('score', Schema('number'))
  .prop('started', Schema('number'))
  .prop('completed', Schema('number'))
  .prop('progress', Schema('number'))

const stats = Schema()
  .prop('activity', firebaseRef)
  .prop('module', uuid)
  .prop('lesson', firebaseRef)
  .prop('totals', totalStat)
  .required(['activity', 'lesson', 'module'])

const statsObject = Schema()
  .prop(/^.*$/, stats)
  .others(false)

// XXX: Stats is a subcollection. Not sure how to document this yet.
const Class = Schema()
  .prop('displayName', displayName)
  .prop('grade', grade)
  .prop('assignedLesson', lesson)
  .prop('school', firebaseRef)
  .prop('owner', firebaseRef)
  .prop('modules', { ...moduleRefObject.schema, minProperties: 2 })
  .prop('teachers', firebaseRefObject)
  .prop('students', firebaseRefObject)
  .prop('stats', statsObject)
  .others(false)
  .required(['displayName', 'grade', 'school', 'owner'])

const createClass = Schema()
  .prop('displayName', displayName)
  .prop('grade', grade)
  .prop('school', firebaseRef)
  .prop('uid', firebaseRef)
  .others(false, 'invalid_fields')
  .required(['displayName', 'grade', 'school'], 'missing_required_field')

const addStudent = Schema()
  .prop('class', firebaseRef)
  .prop('student', firebaseRef)
  .others(false, 'invalid_fields')
  .required(['class', 'student'], 'missing_required_field')

const removeStudent = Schema()
  .prop('class', firebaseRef)
  .prop('student', firebaseRef)
  .others(false, 'invalid_fields')
  .required(['class', 'student'], 'missing_required_field')

const addCourse = Schema()
  .prop('class', firebaseRef)
  .prop('course', firebaseRef)
  .required(['class', 'course'], 'missing_required_field')
  .others(false, 'invalid_fields')

const assignLesson = Schema()
  .prop('lesson', lesson)
  .prop('class', firebaseRef)
  .required(['lesson', 'class'])

exports.default = Class
exports.removeStudent = validate(removeStudent)
exports.assignLesson = validate(assignLesson)
exports.createClass = validate(createClass)
exports.addStudent = validate(addStudent)
exports.addCourse = validate(addCourse)
