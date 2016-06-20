var smith_waterman = require('./smith-waterman-new');
var MyFunction = require('../trace/function');

/**
 * input:
 *  - query sequence (list of function objects)
 *  - db sequences
 *  -
 *
 */

/**
 * local vars:
 *  - k
 *  - list of words of length k in the query sequence
 */

// TODO FOR EACH K_LETTER WORD IN QUERY SEQUENCE





var k = 3; // TODO length of sequence


function tempMain() {
    // iterate over k

    var querySequence = [];
    var tempF = new MyFunction('A', 1, 1, 1);
    querySequence.push(tempF);
    tempF = new MyFunction('C', 1, 1, 1);
    querySequence.push(tempF);
    tempF = new MyFunction('A', 1, 1, 1);
    querySequence.push(tempF);
    tempF = new MyFunction('C', 1, 1, 1);
    querySequence.push(tempF);
    tempF = new MyFunction('A', 1, 1, 1);
    querySequence.push(tempF);
    tempF = new MyFunction('C', 1, 1, 1);
    querySequence.push(tempF);
    tempF = new MyFunction('T', 1, 1, 1);
    querySequence.push(tempF);
    tempF = new MyFunction('A', 1, 1, 1);
    querySequence.push(tempF);

    //var querySequence = ['A', 'C', 'A', 'C', 'A', 'C', 'T', 'A'];
    //var dbSequences = [['A', 'G', 'C', 'A', 'C', 'A', 'C', 'A'], ['A', 'C', 'T', 'G', 'A', 'G', 'C', 'A']];

    var dbSequences = [];
    dbSequences[0] = [];
    dbSequences[1] = [];

    tempF = new MyFunction('A', 1, 1, 1);
    dbSequences[0].push(tempF);
    tempF = new MyFunction('G', 1, 1, 1);
    dbSequences[0].push(tempF);
    tempF = new MyFunction('C', 1, 1, 1);
    dbSequences[0].push(tempF);
    tempF = new MyFunction('A', 1, 1, 1);
    dbSequences[0].push(tempF);
    tempF = new MyFunction('C', 1, 1, 1);
    dbSequences[0].push(tempF);
    tempF = new MyFunction('A', 1, 1, 1);
    dbSequences[0].push(tempF);
    tempF = new MyFunction('C', 1, 1, 1);
    dbSequences[0].push(tempF);
    tempF = new MyFunction('A', 1, 1, 1);
    dbSequences[0].push(tempF);

    tempF = new MyFunction('A', 1, 1, 1);
    dbSequences[1].push(tempF);
    tempF = new MyFunction('C', 1, 1, 1);
    dbSequences[1].push(tempF);
    tempF = new MyFunction('T', 1, 1, 1);
    dbSequences[1].push(tempF);
    tempF = new MyFunction('G', 1, 1, 1);
    dbSequences[1].push(tempF);
    tempF = new MyFunction('A', 1, 1, 1);
    dbSequences[1].push(tempF);
    tempF = new MyFunction('G', 1, 1, 1);
    dbSequences[1].push(tempF);
    tempF = new MyFunction('C', 1, 1, 1);
    dbSequences[1].push(tempF);
    tempF = new MyFunction('A', 1, 1, 1);
    dbSequences[1].push(tempF);


    var kLetterMatches = [];


    //var k = 3;
    for (var k = 3; k < querySequence.length; k ++) {
        // console.log('k: ', k);
        // console.log('<<<<<');
        kLetterMatches[k] = extractQueryWords(querySequence, dbSequences, k);
        // console.log('>>>>>');
    }

    // console.log("==========");
    //console.log(kLetterMatches);
    /*
    for (var i = 0; i < kLetterMatches.length - 3; i ++) {
        var k = i + 3;
        extractQueryWords(querySequence, dbSequences, k);
*/
        /*****
         kLetterMatches[k] = extractQueryWords(querySequence, dbSequences, k);
         console.log('k: ', k);
         console.log(kLetterMatches[k]);
         *****/

        //for (var j = 0; j < kLetterMatches[i + 3].length; j ++) {
        //    var sequenceMatches = kLetterMatches[i + 3][j];
        //    for (var m = 0; m < sequenceMatches.length; m ++) {
        //        expandMatch(querySequence, dbSequences[m], ) // TODO TODO TODO m ????????
        //    }
        //}
    /*
    }
*/

}

function extractQueryWords(querySequence, dbSequences, k) {
    for (var i = 0; i <= querySequence.length - k; i ++) { // TODO <><><><><><><>
        var queryWord = [];
        for (var j = 0; j < k; j ++) {
            // queryWord.push(querySequence[i + j].name);
            queryWord.push(querySequence[i + j]);
        }
        //console.log('finding matches for <', queryWord, '>');
        var matches = findDBMatches(dbSequences, k , queryWord);
        console.log(matches);
        //return matches;

        for (var m = 0; m < matches.length; m ++) {
            for (var n = 0; n < matches[m].length; n ++) {

                expandMatch(querySequence, dbSequences[m], i, matches[m][n], k);
            }
        }
    }
}

function findDBMatches(dbSequences, k, queryWord) {
    var exactMatches = new Array(dbSequences.length);
    for (var i = 0; i < dbSequences.length; i ++) {
        exactMatches[i] = [];
    }

    for (var dbSeqCounter = 0; dbSeqCounter < dbSequences.length; dbSeqCounter ++) {
        var dbSeq = dbSequences[dbSeqCounter];

        for (var i = 0; i <= dbSeq.length - k; i++) {
            var kLetterWord = [];
            for (var j = 0; j < k; j++) {
                // kLetterWord.push(dbSeq[i + j].name);
                kLetterWord.push(dbSeq[i + j]);
            }


            var wordsMatch = 'true';

            for (var m = 0; m < kLetterWord.length; m ++) {
                // TODO COMPARISON FUNCTION
                // if (kLetterWord[m] != queryWord[m]) {
                if (kLetterWord[m].name != queryWord[m].name) {
                    wordsMatch = 'false';
                }
            }
            if (wordsMatch == 'true') {
                //console.log('pushing the exact match');
                console.log('** matched: ', kLetterWord);
                exactMatches[dbSeqCounter].push(i);
            }
        }
    }

    return exactMatches;
}

function expandMatch(querySeq, dbSeq, querySeqIndex, dbSeqIndex, k) {
    // there's an exact match of length k between querySet and dbSeq starting at indices querySeqIndex and dbSeqIndex respectively

    var wordLength = k;

    var queryBeginIndex = querySeqIndex;
    var queryEndIndex = querySeqIndex + wordLength; // TODO - 1;
    var dbBeginIndex = dbSeqIndex;
    var dbEndIndex = dbSeqIndex + wordLength; // TODO - 1;

    var flipExpansionDirection = 'true';


    while (queryBeginIndex >= 0 && dbBeginIndex >= 0 && queryEndIndex < querySeq.length && dbEndIndex < querySeq.length) {
        var queryWord = querySeq.slice(queryBeginIndex, queryEndIndex);
        var dbWord = dbSeq.slice(dbBeginIndex, dbEndIndex);

        smith_waterman.compare(queryWord, dbWord, k, printMatchedSequences);

        if (flipExpansionDirection == 'true') {
            flipExpansionDirection = 'false';
            queryBeginIndex --;
            dbBeginIndex --;
        }
        else {
            flipExpansionDirection = 'true';
            queryEndIndex ++;
            dbEndIndex ++;
        }
    }
}

function printMatchedSequences(seq1, seq2) {
    console.log('*** matched sequence 1: ', seq1);
    console.log('*** matched sequence 2: ', seq2);
}

tempMain();