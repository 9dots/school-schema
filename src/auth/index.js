const validate = require('@weo-edu/validate')
const Schema = require('@weo-edu/schema')

const getAccessToken = Schema()

exports.getAccessToken = validate(getAccessToken)
