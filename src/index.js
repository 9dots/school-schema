const mock = require('./mock')
const map = require('@f/map')

const schemas = {
  activity: require('./activities'),
  module: require('./module'),
  course: require('./course'),
  school: require('./school'),
  class: require('./class'),
  user: require('./user')
}

const mocks = map((val, key) => mock(val.default.schema), schemas)

module.exports = schemas
schemas.mock = mocks
schemas.picturePasswords = require('./picturePasswords')
