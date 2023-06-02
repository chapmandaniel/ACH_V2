let db;

function findAllTransactionsWithBatchId(transactionId) {
    const transaction = db.transaction(['Transactions', 'Batches'], 'readonly');
    const transactionsStore = transaction.objectStore('Transactions');
    const batchesStore = transaction.objectStore('Batches');

    const getRequest = transactionsStore.get(transactionId);

    getRequest.onsuccess = function(event) {
        const transaction = event.target.result;
        if (transaction) {
            const batchId = transaction.batchIndex;
            const batchRequest = batchesStore.get(batchId);

            batchRequest.onsuccess = function(event) {
                const batch = event.target.result;
                if (batch) {
                    console.log('Batch Header:', batch.header);

                    const transactionIndex = batch.index;
                    const cursorRequest = transactionsStore.openCursor();

                    cursorRequest.onsuccess = function(event) {
                        const cursor = event.target.result;
                        if (cursor) {
                            if (cursor.key !== transactionId && cursor.value.batchIndex === batchId) {
                                console.log('Transaction:', cursor.value.entry);
                            }
                            cursor.continue();
                        }
                    };
                } else {
                    console.log('Batch not found for the given transaction ID.');
                }
            };

            batchRequest.onerror = function(event) {
                console.error('Error retrieving batch:', event.target.error);
            };
        } else {
            console.log('Transaction not found for the given ID.');
        }
    };

    getRequest.onerror = function(event) {
        console.error('Error retrieving transaction:', event.target.error);
    };
}
