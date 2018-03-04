'use strict';

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

module.exports = format;
//# sourceMappingURL=index-node6-dev.cjs.js.map
