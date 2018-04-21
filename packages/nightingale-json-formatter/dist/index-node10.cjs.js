'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.default = format;
//# sourceMappingURL=index-node10.cjs.js.map
