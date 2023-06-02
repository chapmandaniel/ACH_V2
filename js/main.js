import {loadAndParseFiles} from "./parser.js";
import {outputSummary} from "./parser.js";


window.onload = function() {
    document.getElementById('openFilesButton').addEventListener('click', function() {
        loadAndParseFiles('nachaFileInput');
        console.log('Files loaded and parsed');
    });

    document.getElementById('summaryButton').addEventListener('click', function() {
        outputSummary('ACHDatabase');
        console.log('Summary output');
    });
}
