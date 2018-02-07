const schema = require('.')
const jsf = require('json-schema-faker')

jsf.option({ alwaysFakeOptionals: true })

module.exports = function (schema) {
  return jsf.resolve(schema)
}
