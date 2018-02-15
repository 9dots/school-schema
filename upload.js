const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert('./secrets.json')
})

module.exports = (collection, data) =>
  admin
    .firestore()
    .collection(collection)
    .add(data)
