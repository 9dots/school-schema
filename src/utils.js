const Schema = require('@weo-edu/schema')

const url = {
  type: 'string',
  format: 'uri',
  faker: 'internet.url'
}

const imageUrl = {
  type: 'string',
  format: 'uri',
  faker: 'image.imageUrl'
}

const firebaseRefObject = Schema()
  .prop(/^[a-zA-Z0-9]{6,}$/, { type: 'boolean' })
  .others(false, 'invalid_keys')

const uuidObject = Schema()
  .prop(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, {
    type: 'boolean'
  })
  .prop('others', false)

const firebaseRef = Schema('string')
  // .min(6, 'invalid_firebase_ref')
  .pattern(/[a-zA-Z0-9]{6,}$/, 'invalid_firebase_ref')

const email = Schema('string').format('email', 'Invalid email address')

const displayName = Schema('string')
  .min(2, 'displayName_too_short')
  .max(40, 'displayName_too_long')
  .faker('random.words')

const description = Schema('string')
  .min(1)
  .max(200)
  .faker('lorem.sentences')

const progress = Schema('number')
  .multiple(1.0)
  .min(1)
  .max(100)

const activityType = Schema('string').enum([
  'assignment',
  'listen',
  'survey',
  'write',
  'video',
  'link',
  'read',
  'test'
])

const ethnicity = Schema('string').enum([
  'white',
  'black',
  'hispanic',
  'asian',
  'pacific islander'
])

const score = Schema('number')
  .max(1000)
  .min(1)
  .multiple(1.0)
  .faker('random.number')

const date = { type: 'string', format: 'date-time' }
const lesson = Schema('string').min(0)
const uuid = Schema('string').min(10)
const gradeMap = Schema()
  .prop(/^[0-9]{1,2}$/, { type: 'boolean' })
  .others(false)
const grade = Schema('number').enum([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14
])

const passwordType = Schema('string').enum(['text', 'image'])
const password = Schema('string')
  .min(4, 'password_too_short')
  .pattern(/[a-zA-Z0-9!@#$%^&*]/, 'invalid_characters')

module.exports = {
  lessonTags: Object.assign({}, firebaseRefObject.schema, { minProperties: 1 }),
  firebaseRefObject,
  passwordType,
  activityType,
  firebaseRef,
  displayName,
  description,
  uuidObject,
  ethnicity,
  imageUrl,
  gradeMap,
  progress,
  password,
  lesson,
  score,
  email,
  grade,
  uuid,
  date,
  url
}