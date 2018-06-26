const Schema = require('@weo-edu/schema')
const validate = require('@weo-edu/validate')
const {
  firebaseRefObject,
  passwordType,
  firebaseRef,
  displayName,
  ethnicity,
  password,
  username,
  email,
  uuid,
  date,
  url
} = require('../utils')

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
  .prop('school', firebaseRef)
  .prop('email', email)
  .prop('name', name)
  .required(['name', 'school'], 'missing_required_field')

const editUser = Schema()
  .prop('username', username)
  .prop('id', firebaseRef)
  .prop('name', name)
  .required(['id', 'name', 'username'], 'missing_required_field')
  .others(false)

const createStudents = Schema('array').items(createStudent.schema)

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
  .prop('lesson', uuid)
  .prop('class', firebaseRef)
  .prop('teachers', firebaseRefObject)
  .prop('module', firebaseRef)
  .required(['lesson', 'class', 'teachers', 'module'])

const setAssignedLessonIndex = Schema()
  .prop('user', firebaseRef)
  .prop('lesson', uuid)
  .prop('current', Schema('number'))

const signInWithPassword = Schema()
  .prop('user', firebaseRef)
  .prop('password', password)
  .prop('type', passwordType)
  .required(['user', 'password', 'type'])

const setInsecurePassword = Schema()
  .prop('user', firebaseRef)
  .prop('type', passwordType)
  .prop('password', password)
  .required(['user', 'type'])

exports.default = User
exports.setAssignedLessonIndex = validate(setAssignedLessonIndex)
exports.setInsecurePassword = validate(setInsecurePassword)
exports.signInWithPassword = validate(signInWithPassword)
exports.setCurrentSchool = validate(setCurrentSchool)
exports.createStudents = validate(createStudents)
exports.teacherSignUp = validate(teacherSignUp)
exports.createStudent = validate(createStudent)
exports.assignLesson = validate(assignLesson)
exports.addToSchool = validate(addToSchool)
exports.editUser = validate(editUser)
exports.setNav = validate(setNav)
