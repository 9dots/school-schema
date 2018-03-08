const { mock } = require('./index')
const upload = require('./upload')
const progress = require('./progress')
const mod = require('./moduleTest')
// const { stats } = require('./class')
const fs = require('fs')

upload('modules', mod)

// mock.module.then(data =>
//   fs.writeFileSync('module.js', `module.exports = ${JSON.stringify(data)}`)
// )
// progress.map(p => upload('activities', p))
// mock.activities.then(data =>
//   fs.writeFileSync('progress.js', `module.exports = ${JSON.stringify(data)}`)
// )
// stats.then(data =>
//   fs.writeFileSync('progress.js', `module.exports = ${JSON.stringify(data)}`)
// )
