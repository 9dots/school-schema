'use strict';

var mapValues = require('@f/map-values');
var firebase = require('firebase');
require('firebase/firestore');

var firestore = firebase.firestore();

/**
 * get classes
 * variables: uid
 */

firestore.collection('classes').where('teachers.' + uid, '==', true).onSnapshot(function (docs) {
  var classes = docs.map(function (d) {
    return d.data();
  });
});

/**
 * get module details
 * variables: cls, moduleId, uid
 */

firestore.collection('modules').doc(moduleId).onSnapshot(function (snap) {
  var moduleData = snap.data();
});

/**
 * Write data
 * assign
 * assign pushes to all students in class
 */

function assign(req, res) {
  var _req$body = req.body,
      students = _req$body.students,
      lesson = _req$body.lesson;

  return mapValues(function (val, key) {
    return firestore.collection('users').doc(key).update({ assignedLesson: lesson });
  }, students);
}