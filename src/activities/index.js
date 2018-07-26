const validate = require('@weo-edu/validate')
const Schema = require('@weo-edu/schema')
const {
  firebaseRefObject,
  activityType,
  firebaseRef,
  displayName,
  lessonTags,
  ethnicity,
  progress,
  score,
  grade,
  uuid,
  url
} = require('../utils')

const properties = Schema()
  .prop('studentAge', Schema('number').faker('random.number'))
  .prop('studentGradeLevel', grade)
  .prop('teacherAge', Schema('number').faker('random.number'))
  .prop('studentEthnicity', ethnicity)
  .prop('teacherEthnicity', ethnicity)
  .prop('activityType', activityType)
  .prop('lessonTags', lessonTags)
  .required([
    'studentAge',
    'studentGradeLevel',
    'teacherAge',
    'studentEthnicity',
    'teacherEthnicity',
    'activityType'
  ])

const subactivity = Schema()
  .prop('url', url)
  .prop('type', activityType)
  .prop('score', score)
  .prop('started', Schema('boolean'))
  .prop('completed', Schema('boolean'))
  .prop('progress', progress)
  .required(['url', 'started', 'completed', 'progress'])

const subactivities = Schema('array').items(subactivity.schema)

const activity = Schema()
  .prop('student', firebaseRef)
  .prop('module', firebaseRef)
  .prop('teachers', firebaseRefObject)
  .prop('class', firebaseRef)
  .prop('displayName', displayName)
  .prop('task', uuid)
  .prop('index', Schema('number'))
  .prop('instance', url)
  .prop('id', uuid)
  .prop('lesson', uuid)
  .prop('score', score)
  .prop('started', Schema('boolean'))
  .prop('completed', Schema('boolean'))
  .prop('progress', progress)
  .prop('url', url)
  .required([
    'student',
    'teachers',
    'module',
    'lesson',
    'class',
    'task',
    'url',
    'displayName'
  ])

const add = Schema()
  .prop('student', firebaseRef)
  .prop('module', firebaseRef)
  .prop('teachers', firebaseRefObject)
  .prop('class', firebaseRef)
  .prop('task', firebaseRef)
  .prop('lesson', firebaseRef)
  .prop('moduleInstance', firebaseRef)
  .prop('score', score)
  .prop('active', Schema('boolean'))
  .prop('started', Schema('boolean'))
  .prop('completed', Schema('boolean'))
  .prop('progress', progress)
  .prop('url', url)
  .required([
    'moduleInstance',
    'student',
    'teachers',
    'module',
    'lesson',
    'class',
    'task',
    'url'
  ])

const setActive = Schema()
  .prop('lesson', firebaseRef)
  .prop('activity', firebaseRef)
  .required(['lesson', 'activity'])

const externalUpdate = Schema()
  .prop('completed', Schema('boolean'))
  .prop('progress', progress)
  .prop('score', score)
  .prop('id', uuid)

const maybeSetCompleted = Schema()
  .prop('activity', firebaseRef)
  .required(['activity'])

// TODO: better name for module instance
exports.default = activity
exports.maybeSetCompleted = validate(maybeSetCompleted)
exports.externalUpdate = validate(externalUpdate)
exports.setActive = validate(setActive)
exports.add = validate(add)
