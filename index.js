const core = require('@actions/core');
const github = require('@actions/github');
const Differ = require('./src/Differ');

try {
  const oldCode = core.getInput('old-code');
  const newCode = core.getInput('new-code');
  const allChangedFilesString = core.getInput('all-changed-files');
  const ignoreList = core.getInput('ignore-list');
  const startMarker = core.getInput('start-marker');
  const endMarker = core.getInput('end-marker');

  console.log(`changed files ${allChangedFilesString}!`);
  console.log(`ignored files ${ignoreList}!`);

  let differ = new Differ(oldCode, newCode, allChangedFilesString, ignoreList, startMarker, endMarker)
  const isSafe = differ.isSafe()
  core.setOutput("is-safe-change", isSafe);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}