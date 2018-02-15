const { mock } = require('./index')
const upload = require('./upload')

mock.module.then(upload)
