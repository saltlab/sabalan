/**
 * Created by saba on 2016-05-07.
 */


// TODO FIX THE PROXY SO THAT IT'LL RETURN APPROPRIATE FILES FOR THESE SABALAN FILES APPENDED TO THE HTML FILE
exports.appendedFiles = function () {
    var appendedScripts = '';

    appendedScripts += '<script sabalan=true class="sabalan-init">window.sabalan = true; var __c_global = 0; var __c_local = 0;</script>';
    appendedScripts += '\n';
    // appendedScripts += '<script sabalan=true src="jquery.toolbar.js"></script>';
    // appendedScripts += '\n';
    // appendedScripts += '<link href="jquery.toolbar.css" rel="stylesheet" />';
    // appendedScripts += '\n';


    // appendedScripts += '<script sabalan=true class="sabalan-init">var __c_global = 0; var __c_local = 0;</script>';
    // appendedScripts += '\n';
    appendedScripts += '<script sabalan=true src="javascripts/sabalan-logs.js"></script>';
    appendedScripts += '\n';

    return appendedScripts;
};

exports.appendToBody = function () {
    var appendix = '';


/*    appendix += '<div id="toolbar-options" class="hidden">';
    appendix += '<a href="#"><i class="fa fa-plane"></i></a>';
    appendix += '<a href="#"><i class="fa fa-car"></i></a>';
    appendix += '</div>';

    appendix += '\n';
*/
    // appendix += '<div id="new-test-div">hello</div>';
    appendix += '<button id="sabalan-toolbar-query" type="button">Record Query</button>';
    appendix += '<button id="sabalan-toolbar-db" type="button">Record DB</button>';

    // appendix += '<script>document.getElementById("sabalan-toolbar").toolbar({content: "#toolbar-options"});</script>'

    /*
    var toolbar = '<script sabalan="true">' +
        'var __sabalan_recording = "false";' +
        'function sabalanToolbarHandler () {if (__sabalan_recording == "true") {__stop_record(); __sabalan_recording = "false"} else {__start_record(); __sabalan_recording = "true";}}' +
        'document.getElementById("sabalan-toolbar").addEventListener("click", sabalanToolbarHandler, false); ' +
        '</script>';
        */

    var toolbar = '<script sabalan="true">document.getElementById("sabalan-toolbar-query").addEventListener("click", sabalanQueryHandler, false);</script>';
    toolbar += '<script sabalan="true">document.getElementById("sabalan-toolbar-db").addEventListener("click", sabalanDBHandler, false);</script>';

    appendix += toolbar;

    return appendix;
}