const Schema = require('@weo-edu/schema')
const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

const url = Schema('string')
  .pattern(urlRegex, 'invalid_url')
  .faker('internet.imageUrl')

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

const username = Schema('string').pattern(/^[a-zA-Z0-9]+$/, 'invalid_username')
const lowerCaseUsername = Schema('string').pattern(
  /^[a-z0-9]+$/,
  'invalid_username'
)

const displayName = Schema('string')
  .min(2, 'displayName_too_short')
  .max(40, 'displayName_too_long')
  .faker('random.words')

const description = Schema('string')
  .min(1)
  .max(250, 'description_too_long')
  .faker('lorem.sentences')

const progress = Schema('number')
  .multiple(1.0)
  .min(0)
  .max(100)

const activityType = Schema('string').enum([
  'review',
  'practice',
  'extension',
  'project',
  'bonus',
  'quiz',
  'media'
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
  .min(0)
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
  lowerCaseUsername,
  firebaseRefObject,
  passwordType,
  activityType,
  firebaseRef,
  displayName,
  description,
  uuidObject,
  ethnicity,
  username,
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
