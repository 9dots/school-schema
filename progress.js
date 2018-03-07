const students = [
  'GOPbdycJimTQ1qSpbiPZKWI4kzo1',
  'L20ycLmm3rVGHdcXg1oFkDM0cv72',
  'SslPhDcrsHVP9Bj7Ut1Os4Y2iH32',
  'VpErAHaPgIVlkNH2YsCr6RZYmJx2',
  'mDR3dHVyFkfqWPQrhDJNu5eBWWF3'
]

const activities = [
  '01b4c85a-68ad-4c3c-a7f6-b42899c30dae',
  '1e20f48e-6428-40c2-aacc-59e9f38e64ca',
  'e3119b9c-8aa4-4b4f-a8a3-72e34a78469b'
]

function getActivity (student, activity) {
  return {
    lesson: 'd67da03b-44b1-408b-b7a6-2c4e7dfabc95',
    teacher: 'GcJyzb0oWSP493THvNUqnMrHlTw2',
    course: 'e5FxRywTSo3uMOYDLXTU',
    module: 'e5FxRywTSo3uMOYDLXTU',
    class: '70zjmacNjyi36k0Wb6XC',
    properties: {
      activityType: 'pixelbots',
      studentEthnicity: 'white',
      teacherEthnicity: 'asian',
      lessonTags: { cs: true },
      studentGradeLevel: '4',
      studentAge: 12,
      teacherAge: 26
    },
    completed: !!Math.floor(Math.random() * 2),
    progress: Math.floor(Math.random() * 100),
    score: Math.floor(Math.random() * 100),
    url: 'http://consuelo.net',
    started: true,
    activity,
    student
  }
}

module.exports = students.reduce(
  (acc, s) => acc.concat(activities.map(a => getActivity(s, a))),
  []
)
