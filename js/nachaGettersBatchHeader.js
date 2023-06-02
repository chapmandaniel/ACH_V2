// Getter functions
function getRecordTypeCode(header) {
    return header.substring(0, 1);
}

function getServiceClassCode(header) {
    return header.substring(1, 4);
}

function getCompanyName(header) {
    return header.substring(4, 20);
}

function getCompanyDiscretionaryData(header) {
    return header.substring(20, 40);
}

function getCompanyIdentification(header) {
    return header.substring(40, 50);
}

function getStandardEntryClassCode(header) {
    return header.substring(50, 53);
}

function getCompanyEntryDescription(header) {
    return header.substring(53, 63);
}

function getCompanyDescriptiveDate(header) {
    return header.substring(63, 69);
}

function getEffectiveEntryDate(header) {
    return header.substring(69, 75);
}

function getSettlementDate(header) {
    return header.substring(75, 78);
}

function getOriginatorStatusCode(header) {
    return header.substring(78, 79);
}

function getOriginatingDFI(header) {
    return header.substring(79, 87);
}

function getBatchNumber(header) {
    return header.substring(87, 94);
}

export {
    getRecordTypeCode,
    getServiceClassCode,
    getCompanyName,
    getCompanyDiscretionaryData,
    getCompanyIdentification,
    getStandardEntryClassCode,
    getCompanyEntryDescription,
    getCompanyDescriptiveDate,
    getEffectiveEntryDate,
    getSettlementDate,
    getOriginatorStatusCode,
    getOriginatingDFI,
    getBatchNumber
}