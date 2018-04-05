const validate = require('@weo-edu/validate')
const Schema = require('@weo-edu/schema')
const {
  displayName,
  description,
  firebaseRef,
  activityType,
  lessonTags,
  imageUrl,
  uuid,
  url
} = require('../utils')

// add description

const task = Schema()
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
const tasks = Schema('array').items(task.schema)

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
  .prop('slides', url)
  .prop('lessonPlan', url)
  .prop('tasks', tasks)
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

const create = Schema()
  .prop('displayName', displayName)
  .prop('description', description)
  .prop('duration', duration)
  .prop('tags', lessonTags)
  .prop('difficulty', Schema('string').enum(['A', 'B', 'C', 'D', 'E']))
  .required(['displayName', 'description'])

const addLesson = Schema()
  .prop('displayName', displayName)
  .prop('description', description)
  .prop('course', firebaseRef)
  .prop('slides', url)
  .prop('lessonPlan', url)
  .required(['displayName', 'course', 'description', 'slides', 'lessonPlan'])
  .others(false, 'invalid_keys')

const removeLesson = Schema()
  .prop('course', firebaseRef)
  .prop('lesson', uuid)
  .required(['lesson', 'course'])
  .others(false, 'invalid_keys')

const updateLesson = Schema()
  .prop('course', firebaseRef)
  .prop('lesson', uuid)
  .prop('displayName', displayName)
  .prop('description', description)
  .prop('course', firebaseRef)
  .prop('slides', url)
  .prop('lessonPlan', url)
  .required(['lesson', 'course'])

const addTask = Schema()
  .prop('course', firebaseRef)
  .prop('lesson', uuid)
  .prop('url', url)
  .required(['url', 'course', 'lesson'])
  .others(false, 'invalid_keys')

const removeTask = Schema()
  .prop('course', firebaseRef)
  .prop('lesson', uuid)
  .prop('task', uuid)
  .required(['task', 'course', 'lesson'])
  .others(false, 'invalid_keys')

const updateTask = Schema()
  .prop('course', firebaseRef)
  .prop('lesson', uuid)
  .prop('task', uuid)
  .prop('displayName', displayName)
  .prop('type', activityType)
  .required(['task', 'course', 'lesson'])
  .others(false, 'invalid_keys')

exports.default = Course
exports.lesson = lesson
exports.create = validate(create)
exports.addLesson = validate(addLesson)
exports.removeLesson = validate(removeLesson)
exports.updateLesson = validate(updateLesson)
exports.addTask = validate(addTask)
exports.removeTask = validate(removeTask)
exports.updateTask = validate(updateTask)
