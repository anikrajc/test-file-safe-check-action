'use strict';

const fs = require('fs')

module.exports = class DiffFile {

    constructor(path, startMarker, endMarker) {
        this.path = path
        this.file = fs.readFileSync(path, 'utf8');
        this.startMarker = startMarker
        this.endMarker = endMarker
        let regexString = "(?<pattern>(\n)?.*(?<marker>" + this.startMarker + "|" + this.endMarker + ").*(\n)?)"
        this.markerPattern = new RegExp(regexString, "g");
        this.isValid = this.isValidAndGenerateMetadata()
    }

    isValidAndGenerateMetadata() {
        let expectStart = true
        let match
        let count = 0
        let regions = []
        let previousIndex = 0
        while ((match = this.markerPattern.exec(this.file)) != null) {
            if (expectStart) {
                if (match.groups.marker == this.startMarker) {
                    expectStart = false
                    if (previousIndex != match.index)
                        regions.push(this.file.substring(previousIndex, match.index+1))
                } else {
                    return false
                }
            }
            else {
                if (match.groups.marker == this.endMarker) {
                    expectStart = true
                    count += 1
                    previousIndex = match.index + match.groups.pattern.length
                } else {
                    return false
                }
            }
        }

        if (!expectStart) {
            return false
        }

        if (previousIndex < this.file.length) {
            regions.push(this.file.substring(previousIndex, this.file.length))
        }

        this.count = count
        this.regions = regions
        return true
    }
}
