const Schema = require('@weo-edu/schema')
const mock = require('../mock')
const {
  displayName,
  description,
  firebaseRef,
  activityType,
  lessonTags,
  url
} = require('../utils')

// add description

const activity = Schema()
  .prop('displayName', displayName)
  .prop('url', url)
  .prop('type', activityType)
  .prop('index', Schema('number'))
  .required(['displayName', 'url', 'type', 'index'])
const activities = Schema()
  .prop(/^.*$/, activity)
  .others(false)

const duration = Schema()
  .prop('time', Schema('string'))
  .prop('unit', Schema('string').enum(['minutes', 'hours', 'days']))

const lesson = Schema()
  .prop('displayName', displayName)
  .prop('description', description)
  .prop('tasks', activities)
  .prop('index', Schema('number'))
  .prop('tags', lessonTags)
  .required(['displayName', 'description', 'index'])

const lessons = Schema()
  .prop(/^.*$/, lesson)
  .others(false)

const Module = Schema()
  .prop('displayName', displayName)
  .prop('description', description)
  .prop('owner', firebaseRef)
  .prop('duration', duration)
  .prop('lessons', lessons)
  .prop('tags', lessonTags)
  .prop('imageUrl', url)
  .prop('difficulty', Schema('string').enum(['A', 'B', 'C', 'D', 'E']))
  .prop('published', Schema('boolean'))
  .prop('featured', Schema('boolean'))
  .prop('assigns', Schema('number'))
  .required(['displayName', 'description', 'owner', 'imageUrl'])

exports.default = Module
