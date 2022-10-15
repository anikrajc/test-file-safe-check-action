const Differ = require('./src/Differ');
const DiffFile = require('./src/DiffFile');

const oldCode = "test/diff/old-code"
const newCode = "test/diff/new-code"
// const allChangedFilesString = '{ "added_files":[\"teststst.txt\"], "copied_files":[], "deleted_files":[\"new.txt\"], "modified_files":[\".github/workflows/check-if-pr-is-dirty.yml\",\".github/workflows/save-pr-approved-commit-sha.yml\"], "renamed_files":[], "type_changed_files":[], "unmerged_files":[], "unknown_files":[] }'
const allChangedFilesString = '{ "added_files":[], "copied_files":[], "deleted_files":[], "modified_files":[\"1-marker.kt\",\"3-markers.kt\"], "renamed_files":[], "type_changed_files":[], "unmerged_files":[], "unknown_files":[] }'
// const allChangedFilesString = '{ "added_files":[], "copied_files":[], "deleted_files":[], "modified_files":[\".github/workflows/check-if-pr-is-dirty.yml\",\"todo.txt\"], "renamed_files":[], "type_changed_files":[], "unmerged_files":[], "unknown_files":[] }'
const ignoreList = '[\"3-markerss.kt\"]'

let a = new Differ(oldCode, newCode, allChangedFilesString, ignoreList, "srr-start", "srr-end")
console.log("is safe " + a.isSafe())

// new DiffFile("test/good/1-marker.kt").isValid()
// new DiffFile("test/good/2-markers.kt").isValid()
// new DiffFile("test/bad/2-end-marker.kt").isValid()
// new DiffFile("test/bad/2-start-marker.kt").isValid()
// new DiffFile("test/bad/mixed-markers.kt").isValid()
// new DiffFile("test/bad/wrong-order-of-markers.kt").isValid()
// new DiffFile("test/bad/1-and-half-markers.kt").isValid()