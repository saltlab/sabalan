/**
 * Created by saba on 2016-05-09.
 */
var fs = require('fs');
var Function = require("./function");
var traceUnitList = [];
var functionList = [];

function createFunction (jsonString) {
    var fName = jsonString.name;
    var fType
    var func = new Function();
    // return function object
    // TODO DEFINE FUNCTION CLASS SOMEWHERE
}

function pushFunction (func) {
    functionList.push(func);
}

var firstWriteToTraceFile = 'true';

exports.addToTraceUnitList = function (jsonString, traceFilePath) {
    // extract trace unit
    // not necessary huh? just decide based on json strings later
    // add to trace unit list
    traceUnitList.push(jsonString);

    // TODO write to file as well
    // TODO create the file w/ date/time in the beginning of session
    if (firstWriteToTraceFile == 'false') {
        fs.appendFileSync(traceFilePath, ',');
    }
    else {
        firstWriteToTraceFile = 'false';
    }
    fs.appendFileSync(traceFilePath, JSON.stringify(jsonString, null, 4)); // TODO options ??
};

exports.addToDbSequences = function (jsonString, dbFilePath, firstWriteToFile) {
    if (firstWriteToFile == 'false') {
        fs.appendFileSync(dbFilePath, ',');
    }
    // else {
    //     firstWriteToFile = 'false';
    // }
    fs.appendFileSync(dbFilePath, JSON.stringify(jsonString, null, 4)); // TODO options ??
};

exports.createFunctionList = function () {
// function createFunctionList() {
    var numOfTraceUnits = traceUnitList.length;
    for (var i = 0; i < numOfTraceUnits; i ++) {
        var tUnit = traceUnitList.shift();
        switch (tUnit.type) {
            case 'enter':
                console.log("enter");
                var newFunc = new Function(tUnit.name, tUnit.time, tUnit.index); // TODO
                functionList.push(newFunc);
                // TODO WHAT ABOUT CALL RELATIONS ETC???
                break;
            case 'exit':
                console.log("exit");
                // TODO WHAT ABOUT CALL RELATIONS ETC???
                break;
            default:
                console.log("------ UNHANDLED TRACE UNIT TYPE");
        }
    }
    // console.log(functionList);

    return functionList;
}

exports.getFunctionList = function () {
    return functionList;
}



function main () {
    /*
    var text = '{ "source": "server", "type": "enter", "name": "()@http://0.", "index": 0, "time": 1462835882375 }';
    var obj = JSON.parse(text);
    traceUnitList.push(obj);

    text = '{ "source": "server", "type": "exit", "name": "()@http://0.", "index": 0, "time": 1462835882379 }';
    obj = JSON.parse(text);
    traceUnitList.push(obj);

    text = '{ "source": "server", "type": "enter", "name": "()@http://0.", "index": 1, "time": 1462835882390 }';
    obj = JSON.parse(text);
    traceUnitList.push(obj);

    text = '{ "source": "server", "type": "enter", "name": "()@http://0.", "index": 2, "time": 1462835882393 }';
    obj = JSON.parse(text);
    traceUnitList.push(obj);

    text = '{ "source": "server", "type": "exit", "name": "()@http://0.", "index": 2, "time": 1462835882568 }';
    obj = JSON.parse(text);
    traceUnitList.push(obj);

    text = '{ "source": "server","type": "exit", "name": "()@http://0.", "index": 1, "time": 1462835882574 }';
    obj = JSON.parse(text);
    traceUnitList.push(obj);
*/

    // var traceFileContent = fs.readFileSync(traceFilePath)

    // createFunctionList();
}

main();