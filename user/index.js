const Schema = require('@weo-edu/schema')
const validate = require('@weo-edu/validate')
const {
  firebaseRef,
  displayName,
  ethnicity,
  // moduleId,
  lesson,
  email,
  uuid,
  date,
  url
} = require('../utils')

// const assignedLesson = Schema()
//   .prop('class', firebaseRef)
//   .prop('module', moduleId)
//   .prop('lesson', lesson)

const name = Schema()
  .prop('given', displayName)
  .prop('family', displayName)
  .required(['given', 'family'])

const gender = Schema('string').enum(['male', 'female', 'other'])
const schools = Schema()
  .prop(/^[a-zA-Z0-9]{6,}$/, Schema('string').enum(['teacher', 'student']))
  .others(false)

const User = Schema()
  .prop('displayName', displayName)
  .prop('avatarUrl', url)
  .prop('name', name)
  .prop('birthDate', date)
  .prop('ethnicity', ethnicity)
  .prop('gender', gender)
  .prop('schools', Object.assign({}, schools.schema, { minProperties: 2 }))
  // .prop('assignedLesson', assignedLesson)
  .prop('splashPage', url)
  .required(['displayName', 'avatarUrl', 'name'], 'missing_required_field')

const teacherSignUp = Schema()
  .prop('displayName', displayName)
  .prop('school', firebaseRef)
  .prop('name', name)
  .required(['displayName', 'name', 'school'], 'missing_required_field')

const createStudent = Schema()
  .prop('studentId', firebaseRef)
  .prop('school', firebaseRef)
  .prop('email', email)
  .prop('name', name)
  .required(['studentId', 'name', 'school'], 'missing_required_field')

const setCurrentSchool = Schema()
  .prop('school', firebaseRef)
  .required(['school'], 'missing_required_field')

const addToSchool = Schema()
  .prop('school', firebaseRef)
  .prop('user', firebaseRef)
  .prop('role', Schema('string').enum(['teacher', 'student']))
  .required(['school'], 'missing_required_field')

const setNav = Schema()
  .prop('uid', firebaseRef)
  .prop('class', firebaseRef)

const assignLesson = Schema()
  .prop('lesson', lesson)
  .prop('url', url)

const setAssignedLessonIndex = Schema()
  .prop('user', firebaseRef)
  .prop('lesson', uuid)
  .prop('current', Schema('number'))

exports.default = User
exports.setAssignedLessonIndex = validate(setAssignedLessonIndex)
exports.setCurrentSchool = validate(setCurrentSchool)
exports.teacherSignUp = validate(teacherSignUp)
exports.createStudent = validate(createStudent)
exports.assignLesson = validate(assignLesson)
exports.addToSchool = validate(addToSchool)
exports.setNav = validate(setNav)
