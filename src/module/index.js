const { default: Activity } = require('../activities')
const { firebaseRef, uuid } = require('../utils')
const validate = require('@weo-edu/validate')
const Schema = require('@weo-edu/schema')
const { default: Course, task } = require('../course')

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

const getTaskTeacherView = Schema()
  .prop('task', task.schema)
  .required(['task'])

exports.default = Course
exports.setActive = validate(setActive)
exports.getTaskTeacherView = validate(getTaskTeacherView)
