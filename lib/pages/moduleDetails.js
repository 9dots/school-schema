'use strict';

var firebase = require('firebase');
require('firebase/firestore');

var firestore = firebase.firestore();

var moduleId = void 0;

firestore.collection('modules').doc(moduleId).get();