'use strict';

var firebase = require('firebase');
require('firebase/firestore');

var firestore = firebase.firestore();

// variables
var userData = void 0,
    uid = void 0;

// get all modules
firestore.collection('classes').where('students.' + uid, '==', true).orderBy('lastAssigned').get().then(function (docs) {
  return docs[0].data();
}).then(function (_ref) {
  var modules = _ref.modules;
  return modules;
});

// get current assignment
var modules = void 0;
firestore.collection('users').doc(uid).onSnapshot(function (snap) {
  var _snap$data = snap.data(),
      _snap$data$assignedLe = _snap$data.assignedLesson,
      classId = _snap$data$assignedLe.class,
      lessonId = _snap$data$assignedLe.lesson,
      moduleId = _snap$data$assignedLe.module;

  var lesson = modules[moduleId].lessons[lessonId];
});

// component vars
var activityId = void 0;

firestore.collection('activities').where('student', '==', uid).where('activity', '==', activityId).onSnapshot(function (docs) {
  var activityData = docs[0].data();
});

/**
 * Write data
 * activity progress
 * class aggregate
 */