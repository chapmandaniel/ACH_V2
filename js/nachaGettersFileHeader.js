function getRecordTypeCode(header) {
    return header.substring(0, 1);
}

function getPriorityCode(header) {
    return header.substring(1, 3);
}

function getImmediateDestination(header) {
    return header.substring(3, 13);
}

function getImmediateOrigin(header) {
    return header.substring(13, 23);
}

function getFileCreationDate(header) {
    return header.substring(23, 29);
}

function getFileCreationTime(header) {
    return header.substring(29, 33);
}

function getFileIDModifier(header) {
    return header.substring(33, 34);
}

function getRecordSize(header) {
    return header.substring(34, 37);
}

function getBlockingFactor(header) {
    return header.substring(37, 39);
}

function getFormatCode(header) {
    return header.substring(39, 40);
}

function getDestination(header) {
    return header.substring(40, 63);
}

function getOriginOrCompanyName(header) {
    return header.substring(63, 86);
}

function getReferenceCode(header) {
    return header.substring(86, 94);
}

export {
    getRecordTypeCode,
    getPriorityCode,
    getImmediateDestination,
    getImmediateOrigin,
    getFileCreationDate,
    getFileCreationTime,
    getFileIDModifier,
    getRecordSize,
    getBlockingFactor,
    getFormatCode,
    getDestination,
    getOriginOrCompanyName,
    getReferenceCode
};