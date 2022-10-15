const core = require('@actions/core');
const github = require('@actions/github');
const Differ = require('./src/Differ');

try {
  const oldCode = core.getInput('old-code');
  const newCode = core.getInput('new-code');
  const allChangedFilesString = core.getInput('all-changed-files');
  const ignoreList = '[\"teststst.txt\"]'
  
  console.log(`Old ${oldCode}!`);
  console.log(`New ${newCode}!`);
  console.log(`changed files ${allChangedFilesString}!`);

  let a = new Differ(oldCode, newCode, allChangedFilesString, ignoreList)
  a.isStale()

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}