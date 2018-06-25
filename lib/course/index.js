'use strict';

var validate = require('@weo-edu/validate');
var Schema = require('@weo-edu/schema');

var _require = require('../utils'),
    activityType = _require.activityType,
    displayName = _require.displayName,
    description = _require.description,
    firebaseRef = _require.firebaseRef,
    uuidObject = _require.uuidObject,
    lessonTags = _require.lessonTags,
    imageUrl = _require.imageUrl,
    gradeMap = _require.gradeMap,
    uuid = _require.uuid,
    url = _require.url;

// add description

var task = Schema().prop('displayName', displayName).prop('url', url).prop('keyTask', Schema('number').enum([0, 1, 2, 3, 4, 5])).prop('type', activityType).prop('id', Schema('string').faker('random.uuid')).prop('index', Schema('number').multiple(1.0).faker('random.number')).required(['url', 'type', 'index']);
var tasks = Schema('array').items(task.schema);

var duration = Schema().prop('time', Schema('number').min(1).max(60).faker('random.number')).prop('unit', Schema('string').enum(['minutes', 'hours', 'days', 'weeks', 'months'])).required(['time', 'unit']);

var lesson = Schema().prop('displayName', displayName).prop('description', description).prop('slides', url).prop('lessonPlan', url).prop('tasks', tasks).prop('id', Schema('string').faker('random.uuid')).prop('index', Schema('number').multiple(1.0).faker('random.number')).prop('tags', lessonTags).required(['displayName', 'description', 'index']);

var lessons = Schema('array').items(lesson.schema);

var Course = Schema().prop('displayName', displayName).prop('description', description).prop('owner', firebaseRef).prop('duration', duration).prop('lessons', lessons).prop('tags', lessonTags).prop('imageUrl', imageUrl).prop('difficulty', Schema('string').enum(['A', 'B', 'C', 'D', 'E'])).prop('published', Schema('boolean').faker('random.boolean')).prop('featured', Schema('boolean').faker('random.boolean')).prop('assigns', Schema('number').min(0).multiple(1.0)).required(['displayName', 'description', 'owner', 'imageUrl']);

var create = Schema().prop('displayName', displayName).prop('description', description).prop('duration', duration).prop('tags', uuidObject).prop('grade', gradeMap).required(['displayName', 'description', 'duration', 'grade', 'tags']);

var addLesson = Schema().prop('displayName', displayName).prop('description', description).prop('draft', firebaseRef).prop('course', firebaseRef).prop('slides', url).prop('lessonPlan', url).required(['displayName', 'course', 'description', 'slides', 'lessonPlan', 'draft']).others(false, 'invalid_keys');

var removeLesson = Schema().prop('course', firebaseRef).prop('draft', firebaseRef).prop('lesson', uuid).required(['lesson', 'course', 'draft']).others(false, 'invalid_keys');

var updateLesson = Schema().prop('course', firebaseRef).prop('draft', firebaseRef).prop('lesson', uuid).prop('displayName', displayName).prop('description', description).prop('course', firebaseRef).prop('slides', url).prop('lessonPlan', url).prop('tasks', tasks).required(['lesson', 'course', 'draft']);

var addTask = Schema().prop('course', firebaseRef).prop('draft', firebaseRef).prop('lesson', uuid).prop('url', url).required(['url', 'course', 'lesson', 'draft']).others(false, 'invalid_keys');

var removeTask = Schema().prop('course', firebaseRef).prop('draft', firebaseRef).prop('lesson', uuid).prop('task', uuid).required(['task', 'course', 'lesson', 'draft']).others(false, 'invalid_keys');

var updateTask = Schema().prop('course', firebaseRef).prop('draft', firebaseRef).prop('lesson', uuid).prop('task', uuid).prop('keyTask', Schema('number').enum([0, 1, 2, 3, 4])).prop('displayName', displayName).prop('type', activityType).required(['task', 'course', 'lesson', 'draft']).others(false, 'invalid_keys');

var courseRef = Schema().prop('course', firebaseRef).required(['course']);

exports.default = Course;
exports.lesson = lesson;
exports.create = validate(create);
exports.update = validate(create);
exports.addLesson = validate(addLesson);
exports.removeLesson = validate(removeLesson);
exports.updateLesson = validate(updateLesson);
exports.addTask = validate(addTask);
exports.removeTask = validate(removeTask);
exports.updateTask = validate(updateTask);
exports.reorder = validate(courseRef);
exports.publish = validate(courseRef);
exports.unpublish = validate(courseRef);
exports.createDraft = validate(courseRef);