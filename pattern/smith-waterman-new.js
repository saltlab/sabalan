var SWScore = require('./score');
var k = 8;
var seq1 = ['A', 'C', 'A', 'C', 'A', 'C', 'T', 'A'];
var seq2 = ['A', 'G', 'C', 'A', 'C', 'A', 'C', 'A'];

//var compareSequences = function(seq1, seq2, k, cb) {
exports.compare = function(seq1, seq2, k, cb) {

    // allocate the empty matrix
    var matrix = new Array(k + 1);
    for (var i = 0; i <= k; i ++) {
        matrix[i] = new Array(k + 1);
        for (var j = 0; j <= k; j ++) {
            matrix[i][j] = 0;
        }
    }

/*    var match = 2; //3;
    var mismatch = -1;
    var matchWArgs = 3.5;

    var o = -2; // -1 ?
*/    var l = 0;
  /*  var e = -1;
*/
// TODO
//if (k <= 1)
//    return;

    for (var i = 1; i <= k; i ++) {
        for (var j = 1; j <= k; j ++) {
            /*
            var gap = o + (l - 1) * e;
            gap = -1; // TODO remove this
            */
            // var score = 0;
            // TODO COMPARISON FUNCTION
            /*
            if (seq1[i - 1].name == seq2[j - 1].name) { // match
                //console.log(i - 1, ' ', j - 1);
                //console.log(seq1[i - 1], ' ', seq2[j - 1]);
                l = 0;
                score = match;
                // if (seq1[i].numOfArgs == seq2[j].numOfArgs) { // TODO
                // TODO gaaaaaaap ???? computing max of row and col according to gap ??????
                //}
                //else {
                //
                //}
            }
            else { // mismatch
                score = mismatch;
                l ++;
            }
            */
            var score = SWScore.calculateScore(seq1[i - 1], seq2[i - 1]); // TODO

            var gap = SWScore.calculateGap(l); // TODO PUT THIS BEFORE OR AFTER UPDATING L? GAP CALCULATION EQUATION ???

            if (score > 0)
                l = 0;
            else
                l ++;
            

            var rowMax = 0;
            var colMax = 0;
            for (var m = 0; m <= i; m ++)
                if (matrix[m][j] > colMax)
                    colMax = matrix[m][j];
            for (var n = 0; n < j; n ++)
                if (matrix[i][n] > rowMax)
                    rowMax = matrix[i][n];
            //matrix[i][j] = Math.max(0, matrix[i - 1][j - 1] + match, Math.max(matrix[i - 1][j] + gap), Math.max(matrix[j][j - ]))
            matrix[i][j] = Math.max(0, matrix[i - 1][j - 1] + score, rowMax + gap, colMax + gap); // ?????????????

        }
    }

// highest value
    var highestValue = 0;
    var highestI = 0, highestJ = 0;
    for (var i = 1; i <= k; i ++) {
        for (var j = 1; j <= k; j ++) {
            if (matrix[i][j] > highestValue) {
                highestValue = matrix[i][j];
                highestI = i;
                highestJ = j;
            }
        }
    }

// backtracking
    i = highestI;
    j = highestJ;
//var actionsQueue = [];
    var actionsStack = [];

    while (i > 0 && j > 0) {
        var diagCell = matrix[i - 1][j - 1];
        var leftCell = matrix[i][j - 1];
        var topCell = matrix[i - 1][j];

        var maxCell = Math.max(diagCell, leftCell, topCell);

        if (maxCell == diagCell) {
            actionsStack.push('align');
            i = i - 1;
            j = j - 1;
        }
        else if (maxCell == leftCell) {
            actionsStack.push('insert');
            j = j - 1;
        }
        else if (maxCell == topCell) {
            actionsStack.push('delete');
            i = i - 1;
        }
    }

    //var alignedSeq1 = '';
    //var alignedSeq2 = '';
    var alignedSeq1 = [];
    var alignedSeq2 = [];
    var seq1Index = 0, seq2Index = 0;

    while (actionsStack.length > 0) {
        var action = actionsStack.pop();
        if (action == 'align') {
            //alignedSeq1 += seq1[seq1Index ++];
            //alignedSeq2 += seq2[seq2Index ++];
            alignedSeq1.push(seq1[seq1Index ++]);
            alignedSeq2.push(seq2[seq2Index ++]);
        }
        else if (action == 'insert') {
            //alignedSeq1 += '-';
            //alignedSeq2 += seq2[seq2Index ++];
            alignedSeq1.push('-');
            alignedSeq2.push(seq2[seq2Index ++]);
        }
        else if (action == 'delete') {
            //alignedSeq1 += seq1[seq1Index ++];
            //alignedSeq2 += '-';
            alignedSeq1.push(seq1[seq1Index ++]);
            alignedSeq2.push('-');
        }
    }

    //console.log(matrix);

    cb(alignedSeq1, alignedSeq2);
}

