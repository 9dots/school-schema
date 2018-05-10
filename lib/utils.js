'use strict';

var Schema = require('@weo-edu/schema');

var url = {
  type: 'string',
  format: 'uri',
  faker: 'internet.url'
};

var imageUrl = {
  type: 'string',
  format: 'uri',
  faker: 'image.imageUrl'
};

var firebaseRefObject = Schema().prop(/^[a-zA-Z0-9]{6,}$/, { type: 'boolean' }).others(false, 'invalid_keys');

var uuidObject = Schema().prop(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, {
  type: 'boolean'
}).prop('others', false);

var firebaseRef = Schema('string')
// .min(6, 'invalid_firebase_ref')
.pattern(/[a-zA-Z0-9]{6,}$/, 'invalid_firebase_ref');

var email = Schema('string').format('email', 'Invalid email address');

var displayName = Schema('string').min(2, 'displayName_too_short').max(40, 'displayName_too_long').faker('random.words');

var description = Schema('string').min(1).max(200).faker('lorem.sentences');

var progress = Schema('number').multiple(1.0).min(1).max(100);

var activityType = Schema('string').enum(['assignment', 'listen', 'survey', 'write', 'video', 'link', 'read', 'test']);

var ethnicity = Schema('string').enum(['white', 'black', 'hispanic', 'asian', 'pacific islander']);

var score = Schema('number').max(1000).min(1).multiple(1.0).faker('random.number');

var date = { type: 'string', format: 'date-time' };
var lesson = Schema('string').min(0);
var uuid = Schema('string').min(10);
var gradeMap = Schema().prop(/^[0-9]{1,2}$/, { type: 'boolean' }).others(false);
var grade = Schema('number').enum([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

var passwordType = Schema('string').enum(['text', 'image']);
var password = Schema('string').min(4, 'password_too_short').pattern(/[a-zA-Z0-9!@#$%^&*]/, 'invalid_characters');

module.exports = {
  lessonTags: Object.assign({}, firebaseRefObject.schema, { minProperties: 1 }),
  firebaseRefObject: firebaseRefObject,
  passwordType: passwordType,
  activityType: activityType,
  firebaseRef: firebaseRef,
  displayName: displayName,
  description: description,
  uuidObject: uuidObject,
  ethnicity: ethnicity,
  imageUrl: imageUrl,
  gradeMap: gradeMap,
  progress: progress,
  password: password,
  lesson: lesson,
  score: score,
  email: email,
  grade: grade,
  uuid: uuid,
  date: date,
  url: url
};