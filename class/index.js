const Schema = require("@weo-edu/schema");
const validate = require("@weo-edu/validate");
const mock = require("../mock");
const { default: Course, lesson } = require("../course");
const {
  firebaseRefObject,
  passwordType,
  displayName,
  firebaseRef,
  grade,
  uuid
} = require("../utils");

const moduleRefObject = Schema()
  .prop(/^.*$/, Course)
  .others(false, "invalid_keys");

const totalStat = Schema()
  .prop("score", Schema("number").faker("random.number"))
  .prop("started", Schema("number").faker("random.number"))
  .prop("completed", Schema("number").faker("random.number"))
  .prop("progress", Schema("number").faker("random.number"));

const stats = Schema()
  .prop("task", firebaseRef)
  .prop("module", firebaseRef)
  .prop("lesson", firebaseRef)
  .prop("totals", totalStat)
  .required(["activity", "lesson", "module"]);

const statsObject = Schema()
  .prop(/^[a-zA-Z]{6,}$/, stats.schema)
  .others(false);

// XXX: Stats is a subcollection. Not sure how to document this yet.
const Class = Schema()
  .prop("displayName", displayName)
  .prop("grade", grade)
  .prop("assignedLesson", lesson)
  .prop("school", firebaseRef)
  .prop("owner", firebaseRef)
  .prop(
    "modules",
    Object.assign({}, moduleRefObject.schema, { minProperties: 2 })
  )
  .prop("teachers", firebaseRefObject)
  .prop("students", firebaseRefObject)
  .prop("members", firebaseRefObject)
  .prop("stats", statsObject)
  .prop("passwordType", passwordType)
  .others(false)
  .required(["displayName", "grade", "school", "owner"]);

const createClass = Schema()
  .prop("displayName", displayName)
  .prop("grade", grade)
  .prop("school", firebaseRef)
  .prop("uid", firebaseRef)
  .others(false, "invalid_fields")
  .required(["displayName", "grade", "school"], "missing_required_field");

const addStudent = Schema()
  .prop("class", firebaseRef)
  .prop("student", firebaseRef)
  .prop("role", Schema("string").enum(["teacher", "student"]))
  .others(false, "invalid_fields")
  .required(["class", "student"], "missing_required_field");

const addTeacher = Schema()
  .prop("class", firebaseRef)
  .prop("teacher", firebaseRef)
  .others(false, "invalid_fields")
  .required(["class"], "missing_required_field");

const removeTeacher = Schema()
  .prop("class", firebaseRef)
  .prop("teacher", firebaseRef)
  .others(false, "invalid_fields")
  .required(["class"], "missing_required_field");

const removeStudent = Schema()
  .prop("class", firebaseRef)
  .prop("student", firebaseRef)
  .others(false, "invalid_fields")
  .required(["class", "student"], "missing_required_field");

const removeStudents = Schema()
  .prop("class", firebaseRef)
  .prop(
    "students",
    Schema("array")
      .items(firebaseRef.schema)
      .min(1)
  )
  .others(false, "invalid_fields")
  .required(["class", "students"], "missing_required_field");

const addCourse = Schema()
  .prop("class", firebaseRef)
  .prop("course", firebaseRef)
  .required(["class", "course"], "missing_required_field")
  .others(false, "invalid_fields");

const assignLesson = Schema()
  .prop("lesson", uuid)
  .prop("class", firebaseRef)
  .prop("module", firebaseRef)
  .required(["lesson", "class"]);

exports.default = Class;
exports.removeStudents = validate(removeStudents);
exports.removeStudent = validate(removeStudent);
exports.removeTeacher = validate(removeTeacher);
exports.assignLesson = validate(assignLesson);
exports.createClass = validate(createClass);
exports.addTeacher = validate(addTeacher);
exports.addStudent = validate(addStudent);
exports.addCourse = validate(addCourse);
