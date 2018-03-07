const { mock } = require('./index')
const upload = require('./upload')
const progress = require('./progress')
// const { stats } = require('./class')
const fs = require('fs')

progress.map(p => upload('activities', p))
// mock.activities.then(data =>
//   fs.writeFileSync('progress.js', `module.exports = ${JSON.stringify(data)}`)
// )
// stats.then(data =>
//   fs.writeFileSync('progress.js', `module.exports = ${JSON.stringify(data)}`)
// )
