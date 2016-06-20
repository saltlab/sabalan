var o = -2;
var e = -1;
var match = 2;
var matchWArgs = 3;
var mismatch = -1;

// var l = 0; // TODO should put this here or where the score is used???

exports.calculateScore = function (func1, func2) {
    if (func1.name == func2.name) {
        if (func1.numOfArgs == func2.numOfArgs)
            return matchWArgs;
        return match;
    }
    return mismatch;
}

exports.calculateGap = function (l) {
    var gap = o + (l - 1) * e;
    return gap;
}