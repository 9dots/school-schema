const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert('./secrets.json')
})

module.exports = data =>
  admin
    .firestore()
    .collection('modules')
    .add(data)
