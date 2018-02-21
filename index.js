const mock = require('./mock')
const map = require('@f/map')

const schemas = {
  activities: require('./activities'),
  module: require('./module'),
  course: require('./course'),
  school: require('./school'),
  class: require('./class'),
  user: require('./user')
}

exports.default = schemas
exports.mock = map((val, key) => mock(val.default.schema), schemas)
