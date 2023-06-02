// Getter functions
function getRecordTypeCode(entry) {
    return entry.substring(0, 1);
}

function getTransactionCode(entry) {
    return entry.substring(1, 3);
}

function getReceivingDFIIdentification(entry) {
    return entry.substring(3, 11);
}

function getCheckDigit(entry) {
    return entry.substring(11, 12);
}

function getDFIAccountNumber(entry) {
    return entry.substring(12, 29);
}

function getAmount(entry) {
    return entry.substring(29, 39);
}

function getIndividualIdentificationNumber(entry) {
    return entry.substring(39, 54);
}

function getIndividualName(entry) {
    return entry.substring(54, 76);
}

function getDiscretionaryData(entry) {
    return entry.substring(76, 78);
}

function getAddendaRecordIndicator(entry) {
    return entry.substring(78, 79);
}

function getTraceNumber(entry) {
    return entry.substring(79, 94);
}

export {
    getRecordTypeCode,
    getTransactionCode,
    getReceivingDFIIdentification,
    getCheckDigit,
    getDFIAccountNumber,
    getAmount,
    getIndividualIdentificationNumber,
    getIndividualName,
    getDiscretionaryData,
    getAddendaRecordIndicator,
    getTraceNumber
}