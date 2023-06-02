// IndexedDB setup
let db;

const request = indexedDB.open("ACHDatabase", 1);
request.onerror = function(event) {console.log("Database error: " + event.target.errorCode);};
request.onsuccess = function(event) { db = event.target.result;};


/**********************************************************************
 * Set up the database
 * @param event
 **********************************************************************/
request.onupgradeneeded = function(event) {
    db = event.target.result;

    // Delete existing object stores if they exist
    if (db.objectStoreNames.contains('Files')) {
        db.deleteObjectStore('Files');}

    if (db.objectStoreNames.contains('Batches')) {
        db.deleteObjectStore('Batches');}

    if (db.objectStoreNames.contains('Transactions')) {
        db.deleteObjectStore('Transactions');}

    // Create new object stores
    const filesStore = db.createObjectStore('Files', { keyPath: 'index' });
    const batchesStore = db.createObjectStore('Batches', { keyPath: 'index', autoIncrement: true });
    batchesStore.createIndex('fileIndex', 'fileIndex', { unique: false });
    const transactionsStore = db.createObjectStore('Transactions', { keyPath: 'index', autoIncrement: true });
    transactionsStore.createIndex('batchIndex', 'batchIndex', { unique: false });
};


/**********************************************************************
 * Store data in the database
 * @param storeName
 * @param data
 *********************************************************************/
function storeInDB(storeName, data) {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.put(data);
}

export {
    storeInDB
};




