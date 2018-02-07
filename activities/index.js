const Schema = require('@weo-edu/schema')
const mock = require('../mock')
const {
  activityType,
  firebaseRef,
  lessonTags,
  ethnicity,
  progress,
  score,
  grade,
  url
} = require('../utils')

const properties = Schema()
  .prop('studentAge', Schema('number'))
  .prop('studentGradeLevel', grade)
  .prop('teacherAge', Schema('number'))
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

const activities = Schema()
  .prop('student', firebaseRef)
  .prop('module', firebaseRef)
  .prop('teacher', firebaseRef)
  .prop('class', firebaseRef)
  .prop('activity', firebaseRef)
  .prop('moduleInstance', firebaseRef)
  .prop('properties', properties)
  .prop('score', score)
  .prop('started', Schema('boolean'))
  .prop('completed', Schema('boolean'))
  .prop('progress', progress)
  .prop('subactivities', subactivities)
  .prop('url', url)
  .required([
    'moduleInstance',
    'subactivities',
    'completed',
    'activity',
    'progress',
    'student',
    'teacher',
    'started',
    'module',
    'class',
    'score',
    'url'
  ])

// TODO: better name for module instance
exports.default = activities
