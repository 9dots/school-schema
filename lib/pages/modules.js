'use strict';

var firebase = require('firebase');
require('firebase/firestore');

var firestore = firebase.firestore();

firestore.collection('modules').where('featured', '==', true);