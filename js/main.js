import {loadAndParseFiles} from "./parser";
import {outputSummary} from "./summary";

window.onload = function() {
    document.getElementById('openFilesButton').addEventListener('click', function() {
        loadAndParseFiles('nachaFileInput');
        console.log('Files loaded and parsed');
    });

    document.getElementById('summaryButton').addEventListener('click', function() {
        outputSummary('NachaDB');
        console.log('Summary output');
    });
}
