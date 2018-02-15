const Schema = require('@weo-edu/schema')
const {
  displayName,
  description,
  firebaseRef,
  activityType,
  lessonTags,
  imageUrl,
  url
} = require('../utils')

// add description

const activity = Schema()
  .prop('displayName', displayName)
  .prop('url', url)
  .prop('type', activityType)
  .prop('id', Schema('string').faker('random.uuid'))
  .prop(
    'index',
    Schema('number')
      .multiple(1.0)
      .faker('random.number')
  )
  .required(['displayName', 'url', 'type', 'index'])
const activities = Schema('array').items(activity.schema)

const duration = Schema()
  .prop(
    'time',
    Schema('number')
      .min(1)
      .max(60)
      .faker('random.number')
  )
  .prop('unit', Schema('string').enum(['minutes', 'hours', 'days']))
  .required(['time', 'unit'])

const lesson = Schema()
  .prop('displayName', displayName)
  .prop('description', description)
  .prop('tasks', activities)
  .prop('id', Schema('string').faker('random.uuid'))
  .prop(
    'index',
    Schema('number')
      .multiple(1.0)
      .faker('random.number')
  )
  .prop('tags', lessonTags)
  .required(['displayName', 'description', 'index'])

const lessons = Schema('array').items(lesson.schema)

const Course = Schema()
  .prop('displayName', displayName)
  .prop('description', description)
  .prop('owner', firebaseRef)
  .prop('duration', duration)
  .prop('lessons', lessons)
  .prop('tags', lessonTags)
  .prop('imageUrl', imageUrl)
  .prop('difficulty', Schema('string').enum(['A', 'B', 'C', 'D', 'E']))
  .prop('published', Schema('boolean').faker('random.boolean'))
  .prop('featured', Schema('boolean').faker('random.boolean'))
  .prop(
    'assigns',
    Schema('number')
      .min(0)
      .multiple(1.0)
  )
  .required(['displayName', 'description', 'owner', 'imageUrl'])

exports.default = Course
