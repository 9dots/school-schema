'use strict';

var firebase = require('firebase');
require('firebase/firestore');

var firestore = firebase.firestore();

var uid = void 0;

firestore.collection('classes').where('teachers.' + uid, '==', true).onSnapshot();