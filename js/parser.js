import * as DB from "./database";


// Load and parse files
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


// Parse NACHA file
function parseFile(content, fileIndex, fileName) {
    const lines = content.split('\n');
    const fileHeader = lines[0];
    DB.storeInDB("Files", { index: fileIndex, header: fileHeader, name: fileName });

    let batchIndex = 0;
    let transactionIndex = 0;
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('5')) { // Assuming batch header starts with 5
            DB.storeInDB("Batches", { index: batchIndex, header: line, fileIndex });
            batchIndex++;
        } else if (line.startsWith('6')) { // Assuming entry line starts with 6
            DB.storeInDB("Transactions", { index: transactionIndex, entry: line, batchIndex });
            transactionIndex++;
        } else if (line.startsWith('9')) { // Assuming file end record starts with 9
            break;
        }
    }

}


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

export {
    loadAndParseFiles,
    parseFile,
    outputSummary
};