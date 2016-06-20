/**
 * Created by saba on 2016-05-09.
 */

function SFunction (name, fileName, numOfArgs, timeStamp, index) {
    // var Function = function (name, fileName, lineNumber, numOfArgs) {
    this.name = name;
    // this.loc = LOC;
    this.fileName = fileName;
    this.numOfArgs = numOfArgs;
    this.timeStamp = timeStamp;
    this.index = index;
}

SFunction.prototype.fooBar = function () {

}

module.exports = SFunction;