// Import the necessary function from the database module
import { storeInDB } from "./database.js";



/**********************************************************************
 * Load and parse files
 * @param {string} fileInputId - The ID of the file input element
 *********************************************************************/
function loadAndParseFiles(fileInputId) {
    const files = document.getElementById(fileInputId).files;
    Array.from(files).forEach((file, fileIndex) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            parseFile(content, fileIndex, file.name); // Pass the file name to the parseFile function
        };
        reader.readAsText(file);
    });
    outputSummary("ACHDatabase");
}



/**********************************************************************
 * Parse NACHA file
 * @param {string} content - The content of the file
 * @param {number} fileIndex - The index of the file
 * @param {string} fileName - The name of the file
 *********************************************************************/
function parseFile(content, fileIndex, fileName) {
    const lines = content.split('\n');
    const fileHeader = lines[0];

    storeInDB("Files", { index: fileIndex, header: fileHeader, name: fileName });
    let batchIndex = 0;
    let transactionIndex = 0;

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('5')) {
            storeInDB("Batches", { index: batchIndex, header: line, fileIndex });
            batchIndex++;
        } else if (line.startsWith('6')) {
            storeInDB("Transactions", { index: transactionIndex, entry: line, batchIndex });
            transactionIndex++;
        } else if (line.startsWith('9')) {
            break;
        }
    }
}


/**********************************************************************
 * Output summary of the database
 * @param {string} dbName - The name of the database
 **********************************************************************/
function outputSummary(dbName) {
    let openRequest = indexedDB.open(dbName);
    openRequest.onsuccess = function(event) {
        let db = event.target.result;
        let promises = ['Files', 'Batches', 'Transactions'].map(storeName => {
            return new Promise((resolve, reject) => {
                let transaction = db.transaction(storeName, 'readonly');
                let store = transaction.objectStore(storeName);
                let countRequest = store.count();
                countRequest.onsuccess = function() {
                    resolve({ storeName, count: countRequest.result });
                };
                countRequest.onerror = function() {
                    reject(new Error(`Error counting objects in store ${storeName}`));
                };
            });
        });

        Promise.all(promises).then(results => {
            console.log('Data summary:');
            results.forEach(result => {
                console.log(`${result.storeName}: ${result.count} object(s)`);
            });
        }).catch(error => {
            console.error('Error retrieving data summary:', error);
        });
    };

    openRequest.onerror = function(event) {
        console.error('Error opening database:', event.target.error);
    };
}



// Export functions
export {
    loadAndParseFiles,
    parseFile,
    outputSummary
};
