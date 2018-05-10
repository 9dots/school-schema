'use strict';

var firebase = require('firebase');
var uuidv1 = require('uuid/v1');
require('firebase/firestore');

var firestore = firebase.firestore();

var uid = void 0;

firestore.collection('classes').where('teachers.' + uid, '==', true).onSnapshot();

/**
 * Write data
 * classes.addCourse
 */