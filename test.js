const { mock } = require('./index')
const upload = require('./upload')

mock.course.then(data => upload('courses', data))
mock.course.then(console.log)
