const schema = require('.')
const jsf = require('json-schema-faker')

module.exports = function(schema) {
  return jsf.resolve(schema)
}
