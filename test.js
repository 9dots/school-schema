const { mock } = require('./index')
const upload = require('./upload')

mock.course.then(data => upload('courses', data))
