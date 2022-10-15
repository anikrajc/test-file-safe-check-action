'use strict';

const DiffFile = require('./DiffFile');
var isEqual = require('lodash/isequal');

module.exports = class Comparator {

    constructor(oldPath, newPath, startMarker, endMarker) {
        this.oldFile = new DiffFile(oldPath, startMarker, endMarker)
        this.newFile = new DiffFile(newPath, startMarker, endMarker)
    }

    isSafe() {
        return this.oldFile.isValid && this.newFile.isValid && 
        isEqual(this.oldFile.regions, this.newFile.regions)
    }
}
