const { firebaseRef, uuid } = require('../utils')
const Activity = require('../activities').default
const validate = require('@weo-edu/validate')
const Schema = require('@weo-edu/schema')
const Course = require('../course').default

const taskProgress = Schema()
  .prop('score', Schema('number'))
  .prop('progress', Schema('number'))
  .prop('started', Schema('boolean'))
  .prop('completed', Schema('boolean'))

// Object of user progress by user id
const userProgress = Schema().prop(/userId/, taskProgress.schema)

// Document that contains object with keys taskId
const lessonProgress = Schema().prop(/userId/, userProgress.schema)

// Collection of documents by lessonID
Schema().prop(/lessonId/, lessonProgress.schema)

const setActive = Schema()
  .prop('module', firebaseRef)
  .prop('lesson', uuid)
  .prop('user', firebaseRef)
  .prop('activity', Activity.schema)
  .required(['module', 'lesson', 'activity'])

exports.default = Course
exports.setActive = validate(setActive)
