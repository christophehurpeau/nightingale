/**
 * @param {Object} record
 * @returns {string}
 */
export default function format(record) {
    return JSON.stringify({
        key: record.key,
        level: record.level,
        datetime: record.datetime,
        message: record.message,
        metadata: record.metadata,
        extra: record.extra
    });
}
//# sourceMappingURL=index.js.map