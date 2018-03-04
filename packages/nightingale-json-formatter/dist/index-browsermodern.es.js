/**
 * @param {Object} record
 * @returns {string}
 */
function format(record) {
  return JSON.stringify({
    key: record.key,
    level: record.level,
    datetime: record.datetime,
    message: record.message,
    metadata: record.metadata,
    extra: record.extra
  });
}

export default format;
//# sourceMappingURL=index-browsermodern.es.js.map
