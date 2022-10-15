const Differ = require('./src/Differ');

const oldCode = "test/diff/old-code"
const newCode = "test/diff/new-code"
// const allChangedFilesString = '{ "added_files":[\"teststst.txt\"], "copied_files":[], "deleted_files":[\"new.txt\"], "modified_files":[\".github/workflows/check-if-pr-is-dirty.yml\",\".github/workflows/save-pr-approved-commit-sha.yml\"], "renamed_files":[], "type_changed_files":[], "unmerged_files":[], "unknown_files":[] }'
const allChangedFilesString = '{ "added_files":[], "copied_files":[], "deleted_files":[], "modified_files":[\"2-markers.kt\"], "renamed_files":[], "type_changed_files":[], "unmerged_files":[], "unknown_files":[] }'
// const allChangedFilesString = '{ "added_files":[], "copied_files":[], "deleted_files":[], "modified_files":[\".github/workflows/check-if-pr-is-dirty.yml\",\"todo.txt\"], "renamed_files":[], "type_changed_files":[], "unmerged_files":[], "unknown_files":[] }'
const ignoreList = '[\"teststst.txt\"]'

let a = new Differ(oldCode, newCode, allChangedFilesString, ignoreList)
a.isStale()