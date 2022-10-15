'use strict';

const path = require('path');
const Comparator = require('./Comparator');
var includes = require('lodash/includes');

module.exports = class Differ {

  constructor(oldCode, newCode, files, ignoreList, startMarker, endMarker) {
    this.oldCode = oldCode
    this.newCode = newCode
    this.startMarker = startMarker
    this.endMarker = endMarker
    this.files = JSON.parse(files.replace(/\\/g, ""));
    this.ignoreList = JSON.parse(ignoreList.replace(/\\/g, ""));
  }

  isSafe() {
    if (this.canExitEarly()) {
      return false
    }

    return this.isSafeModification()
  }

  // Modification is considered safe if 
  // 1. It is part of ignore list
  // 2. Modification in file is within ignore markers
  isSafeModification() {
    for (let i = 0; i < this.files.modified_files.length; i++) {
      let file = this.files.modified_files[i];
      if (includes(this.ignoreList, file)) {
        continue;
      }
      let oldFilePath = path.join(this.oldCode, file);
      let newFilePath = path.join(this.newCode, file);
      let comparator = new Comparator(oldFilePath, newFilePath, this.startMarker, this.endMarker)
      if (!comparator.isSafe()) {
        return false
      }
    }
    return true
  }

  // Exit early if there are files other than modified files
  canExitEarly() {
    return (
      this.files.added_files.length != 0 ||
      this.files.copied_files.length != 0 ||
      this.files.deleted_files.length != 0 ||
      this.files.renamed_files.length != 0 ||
      this.files.type_changed_files.length != 0 ||
      this.files.unmerged_files.length != 0 ||
      this.files.unknown_files.length != 0
    )
  }
}
