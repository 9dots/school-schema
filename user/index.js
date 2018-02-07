const Schema = require('@weo-edu/schema')
const validate = require('@weo-edu/validate')
const mock = require('../mock')
const {
  firebaseRef,
  displayName,
  ethnicity,
  moduleId,
  lesson,
  email,
  date,
  url
} = require('../utils')

const assignedLesson = Schema()
  .prop('class', firebaseRef)
  .prop('module', moduleId)
  .prop('lesson', lesson)

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
  .prop('schools', { ...schools.schema, minProperties: 2 })
  // .prop('assignedLesson', assignedLesson)
  .prop('splashPage', url)
  .required(['displayName', 'avatarUrl', 'name'])

console.log(User.schema)

const teacherSignUp = Schema()
  .prop('displayName', displayName)
  .prop('school', firebaseRef)
  .prop('uid', firebaseRef)
  .prop('name', name)
  .required(['displayName', 'name', 'school', 'uid'])

const createStudent = Schema()
  .prop('studentId', firebaseRef)
  .prop('school', firebaseRef)
  .prop('email', email)
  .prop('uid', firebaseRef)
  .prop('name', name)
  .required(['studentId', 'name', 'school', 'uid'])

const setCurrentSchool = Schema()
  .prop('school', firebaseRef)
  .prop('uid', firebaseRef)
  .required(['school', 'uid'])

const addToSchool = Schema()
  .prop('school', firebaseRef)
  .prop('uid', firebaseRef)
  .prop('user', firebaseRef)
  .prop('role', Schema('string').enum(['teacher', 'student']))
  .required(['school', 'uid'])

const setNav = Schema().prop('uid', firebaseRef)

exports.default = User
exports.setCurrentSchool = validate(setCurrentSchool)
exports.teacherSignUp = validate(teacherSignUp)
exports.createStudent = validate(createStudent)
exports.addToSchool = validate(addToSchool)
exports.setNav = validate(setNav)
