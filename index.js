/**
 * Created by saba on 2016-05-05.
 */

var hoxy = require('hoxy');
var cheerio = require('cheerio');
var appendInstrumentation = require('./instrument/append-files');
var instrument = require('./instrument/transform-js');
var path = require('path');
var fs = require('fs');
var trace = require('./trace/functionList');

var port = 8080;

var traceFilePath;
var dbTraceFilePath; // TODO
var firstWriteToDbFile;

var db_file_index = 0;

var proxy = hoxy.createServer().listen(port, function () {
    console.log('proxy listening on port ' + port + '.');

    traceFilePath = './logs/' + new Date() + '.json';
    fs.closeSync(fs.openSync(traceFilePath, 'w'));
    fs.appendFileSync(traceFilePath, '['); // TODO

    // TODO
/*    dbTraceFilePath = './logs/db_' + (db_file_index ++) + new Date() + '.json';
    fs.openSync(dbTraceFilePath, 'w');
    fs.writeFileSync(dbTraceFilePath, '[');
*/
});

proxy.intercept({
    phase: 'request'
}, function (req, res, cycle) {
    // console.log('>>> request: ', req.url);

    // TODO CHECK FOR SABALAN LOG REQUESTS

    // TODO MOVE TO RESPONSE 404 ?????????
    // console.log(req.url);
    if (req.url.indexOf('sabalan-logs.js') > -1) {
        // res.setHeader('content-type', 'application/javascript');
        // res.setHeader('')
        var filePath = path.join('javascripts', 'sabalan-logs.js');
        var stat = fs.statSync(filePath);

        res.setHeader('Content-Type', 'application/javascript');

        // res.writeHead(200, {
        //     'Content-Type': 'application/javascript',
        //     'Content-Length': stat.size
        // });
        var readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
        /******
    else if (req.url.indexOf('sabalan-req') > -1) {
        console.log('////////////////');
        console.log(req.body);
    }
         ******/
})

proxy.intercept({
    phase: 'request',
    fulUrl: 'http://127.0.0.1/sabalan-req',
    method: 'POST',
    as: 'json'
}, function (req, res, cycle) {
    // TODO

    console.log(req.json);

    if (req.url.indexOf('sabalan-req') > -1) {
        console.log('////////////////');
        // console.log(req.body);
        trace.addToTraceUnitList(req.json, traceFilePath);
    }
        /*
    else if (req.url.indexOf('sabalan-db-req') > -1) {
        console.log('////////////////');
        // console.log(req.body);
        trace.addToTraceUnitList(req.json, dbTraceFilePath);
    }*/

})

proxy.intercept({
    phase: 'request',
    fulUrl: 'http://127.0.0.2/sabalan-db-req',
    method: 'POST',
    as: 'json'
}, function (req, res, cycle) {
    // TODO

    console.log(req.json);

    if (req.url.indexOf('sabalan-db-req') > -1) {
        console.log('////////////////');
        // console.log(req.body);
        // trace.addToTraceUnitList(req.json, dbTraceFilePath);
        trace.addToDbSequences(req.json, dbTraceFilePath, firstWriteToDbFile);

        firstWriteToDbFile = 'false';
    }

})

proxy.intercept({
    phase: 'request',
    // fulUrl: 'http://127.0.0.2/sabalan-start-rec',
    fulUrl: 'http://127.0.0.1/sabalan-start-rec',
    method: 'POST',
    as: 'json'
}, function (req, res, cycle) {
    console.log('------------- ', req.url);
    if (req.url == '/sabalan-start-rec') { // TODO
        console.log('()()()()()()()()()()()()()()() start');
        console.log(req.url);
        // fs.appendFileSync(traceFilePath, '['); // TODO
    }
})

proxy.intercept({
    phase: 'request',
    // fulUrl: 'http://127.0.0.2/sabalan-stop-rec',
    fulUrl: 'http://127.0.0.1/sabalan-stop-rec',
    method: 'POST',
    as: 'json'
}, function (req, res, cycle) {
    console.log('------------- ', req.url);
    if (req.url == '/sabalan-stop-rec') { // TODO
        console.log('()()()()()()()()()()()()()()() stop');
        console.log(req.url);
        fs.appendFileSync(traceFilePath, ']');
        
        trace.createFunctionList(); // TODO OOOOOOOOOOOO
    }
})

proxy.intercept({
    phase: 'request',
    // fulUrl: 'http://127.0.0.2/sabalan-start-rec',
    fulUrl: 'http://127.0.0.2/sabalan-db-start-rec',
    method: 'GET'//,
    // as: 'json'
}, function (req, res, cycle) {
    console.log('------------- ', req.url);
    if (req.url == '/sabalan-db-start-rec') { // TODO
        firstWriteToDbFile = 'true'; // TODO
        console.log('()()()()()()()()()()()()()()() db start');
        console.log(req.url);
        // fs.appendFileSync(traceFilePath, '['); // TODO


        // TODO start recording for db
        dbTraceFilePath = './logs/db_' + (db_file_index ++) + new Date() + '.json';
        fs.openSync(dbTraceFilePath, 'w');
        fs.writeFileSync(dbTraceFilePath, '[');

    }
})


proxy.intercept({
    phase: 'request',
    // fulUrl: 'http://127.0.0.2/sabalan-stop-rec',
    fulUrl: 'http://127.0.0.2/sabalan-db-stop-rec',
    method: 'GET'//,
    // as: 'json'
}, function (req, res, cycle) {
    console.log('------------- ', req.url);
    if (req.url == '/sabalan-db-stop-rec') { // TODO
        console.log('()()()()()()()()()()()()()()() db stop');
        console.log(req.url);
        // fs.appendFileSync(traceFilePath, ']');

        // trace.createFunctionList(); // TODO OOOOOOOOOOOO

        // TODO stop recording db session
        // fs.writeFileSync(dbTraceFilePath, ']');
        fs.appendFileSync(dbTraceFilePath, ']');
    }
})


/*
proxy.intercept({
    phase: 'response'
    // mimeType: only get text/html and javascript
}, function (req, res, cycle) {
    console.log('>>> response: ');
    console.log('statusCode: ', res.statusCode);
    console.log('content-type', response.headers['content-type']);

});
*/
/*
proxy.intercept({
    phase: 'response',
    // mimeType: 'text/html',
    // as: '$'
}, function (req, res, cycle) {
    console.log('>>> response: ');
    var contentType = res.headers['content-type'];
    if (contentType.toLowerCase().indexOf('html') > -1) {
        console.log('=== HTML');

        console.log('<<<<<<<<<<<<<<<<<');
        console.log(res.$('title'));
        console.log('>>>>>>>>>>>>>>>>>');
        var $ = cheerio.load(res.body);
        console.log('*** ', $.title);
    }
    else if (contentType.toLowerCase().indexOf('javascript') > -1) {
        console.log('=== JAVASCRIPT')
    }
    else {
        console.log('=== OTHER: ', contentType);
    }
    */
    /*
     console.log('statusCode: ', res.statusCode);
     console.log('content-type', res.headers['content-type']);
     console.log('from dom', res.$('title').text('Fake Title!'));
     */
/*
});
*/

/*
proxy.intercept({
    phase: 'response',
    mimeType: 'text/html',
    as: '$'
}, function (req, res, cycle) {
    console.log('>>> response: ');
    var contentType = res.headers['content-type'];
        console.log('=== HTML');

        console.log('<<<<<<<<<<<<<<<<<');
        console.log(res.$('title'));
        console.log('>>>>>>>>>>>>>>>>>');
        var $ = cheerio.load(res.body);
        console.log('*** ', $.title);
});
    */






proxy.intercept({
    phase: 'response',
    mimeType: 'text/html',
    as: '$'
}, function (req, res, cycle) {

    if (res.statusCode == 404) {
        console.log('*****************');

        // TODO CHECK IF A SABALAN FILE AND E.G. SABALAN_LOGS.JS

        var reqUrl = req.url;

        if (reqUrl.indexOf('sabalan-logs.js') > -1) {
            // var filePath = path.join('javascripts', 'sabalan-logs.js');
            // var stat = fs.statSync(filePath);

            // res.setHeader('Content-Type', 'application/javascript');

            res.statusCode = 200;
            res.headers['Content-Type'] = 'application/javascript';
            // res.writeHead(200, {
            //     'Content-Type': 'application/javascript',
            //     'Content-Length': stat.size
            // });
            // res.string = 'var a = 1;';
            res.string = '//sabalan\n';
            res.string += fs.readFileSync('javascripts/sabalan-logs.js');
            // var readStream = fs.createReadStream(filePath);
            // readStream.pipe(res);
        }
        else if (reqUrl.indexOf('sabalan-req') > -1) {
            // logging functions

            console.log('<><><><><><><><><>');
            // TODO LOG AND STUFF
        }


    }


    res.$('title').text('Fake Title!');

    var htmlInstrumented = 'false';
    res.$('.sabalan-init').each(function () {
        htmlInstrumented = 'true';
    });

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', htmlInstrumented);

    if (htmlInstrumented == 'false') {
        // TODO append initial instrumentation to the beginning of head
        res.$('head').prepend(appendInstrumentation.appendedFiles);
        // res.$('head').prepend('<script class="sabalan-init">var __sabalan = "true";</script>')
        res.$('body').prepend(appendInstrumentation.appendToBody());
/*        console.log('<<<<<<<<<<<<<<<<<<');
        console.log(res.$('body'));
        console.log('>>>>>>>>>>>>>>>>>>');
*/
    }
    else {
        console.log('==================');
    }
/*
    res.$('head').each(function () {
        console.log('1');
        console.log(res.$('this').type);
        console.log(res.$(this).children().length);
        res.$(this).children().each(function () {
            console.log('2');
            console.log(res.$('this').type);
            var sabalanProperty = res.$(this).getAttribute('sabalan');
            if (typeof sabalanProperty != 'undefined' && sabalanProperty == 'true') {

            }
            else { // TODO instrument
                // TODO add sabalan tag and append log file
                console.log('html file not instrumented')
            }
        });
    });
*/
    res.$('script').each(function () {
        console.log('---------');
        // console.log(this.innerHTML);
        // console.log(res.$(this).text());

        if (typeof res.$(this).attr('sabalan') != 'undefined' && res.$(this).attr('sabalan') == 'true') {
            // don't do anything?
        }
        else {
            var scriptText = res.$(this).text();
            var instrumentedAst = instrument.instrumentAst(scriptText);
            var instrumentedScript = instrument.generateScript(instrumentedAst);
            res.$(this).text(instrumentedScript);

            res.$(this).attr('sabalan', 'true'); // check if this wasn't true before instrumenting
        }

    });
});


proxy.intercept({
    phase: 'response',
    mimeType: 'application/javascript',
    as: 'string'
}, function (req, res, cycle) {
    // console.log(res.string);
    // res.string = 'hello';

    var scriptText = res.string;

    // TODO ADD '//SABALAN' TO THE BEGINNING OF THE FILE AND CHECK THAT
    if (scriptText.startsWith('//sabalan')) {
        // what to do here?
    }
    else {

        // TODO TEMP
        // TODO TEMP
        // TODO TEMP
/*        if (scriptText.indexOf('MelonJS Game Engine') > -1) {
            // TODO TEMP
            // TODO TEMP
            // TODO CHECK FILES THAT SHOULD BE EXCLUDED (libraries, etc.) ===>>> create a list
            // if ()
            var instrumentedAst = instrument.instrumentAst(scriptText);
            var instrumentedScript = instrument.generateScript(instrumentedAst);
            res.string = instrumentedScript;
        }
        */

        var instrumentedAst = instrument.instrumentAst(scriptText);
        var instrumentedScript = instrument.generateScript(instrumentedAst);
        res.string = instrumentedScript;

        console.log('&&&&&&&&&&&');
        console.log('&& ', req.url);


    }
});



/*
proxy.intercept({
    phase: 'response',
    // mimeType: 'text/html',
    as: 'string'
}, function (req, res, cycle) {
    console.log('>>> response: ');
    var contentType = res.headers['content-type'];
    // console.log(res.string);

    if (contentType.toLowerCase().indexOf('html') > -1) {
        console.log('=== HTML');

        // TODO IF PAGE IS NOT INSTRUMENTED ADD THE HEADER INSTRUMENTATIONS

        // console.log('<<<<<<<<<<<<<<<<<');
        // console.log(res.$('title'));
        // console.log('>>>>>>>>>>>>>>>>>');
        var $ = cheerio.load(res.string);
        // console.log('*** ', $('title')[0].text());

        $('head').each(function () {
            console.log('****');
            // console.log(this.find('title'));
        });

        $('title').each(function () {
            // var name = $(this).attr('name');
            // var name = $(this).children[0].data;
            // console.log('<><><> ', $(this).name);
            console.log('<><><> ', this.name);
        });

        console.log('hello');

        $('script').each(function () {
            // console.log(this);
            console.log(this.children[0].data);
            // TODO INSTRUMENT THE SCRIPT TAG
        });
    }
    else if (contentType.toLowerCase().indexOf('javascript') > -1) {
        console.log('=== JAVASCRIPT')
        // TODO INSTRUMENT THE SCRIPT FILE
    }
    else {
        // console.log('=== OTHER: ', contentType);
    }

    // console.log('=== HTML');
    //
    // console.log('<<<<<<<<<<<<<<<<<');
    // console.log(res.$('title'));
    // console.log('>>>>>>>>>e>>>>>>>>');
    // var $ = cheerio.load(res.body);
    // console.log('*** ', $.title);
});
*/