const mock = require('./mock')
const map = require('@f/map')

const schemas = {
  activities: require('./activities'),
  class: require('./class'),
  course: require('./course'),
  school: require('./school'),
  user: require('./user')
}

exports.default = schemas
exports.mock = map((val, key) => mock(val.default.schema), schemas)
