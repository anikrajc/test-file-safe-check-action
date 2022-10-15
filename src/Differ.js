'use strict';

const fs = require('fs')
const path = require('path');

module.exports = class Differ {

  constructor(oldCode, newCode, files, ignoreList) {
    this.oldCode = oldCode
    this.newCode = newCode
    this.files = JSON.parse(files.replace(/\\/g, ""));
    this.ignoreList = JSON.parse(ignoreList.replace(/\\/g, ""));
  }

  isStale() {
    if (this.canExitEarly()) {
      console.log("Exiting early");
      return true
    }

    if (this.isModificationUnsafe()) {
      console.log("Modification unsafe");
      return true
    }

    return false
  }

  // Modification is considered unsafe if 
  // 1. It is not part of ignore list
  // 2. Modification in file is not withing ignore bounds
  isModificationUnsafe() {
    console.log("modifcation check")

    this.files.modified_files.forEach((obj) => {
      console.log(obj);
      let filePath = path.join(this.newCode, obj);
      console.log(filePath);
      try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    });

    return false
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
