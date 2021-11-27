'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function map2object(map) {
  var object = {};
  map.forEach(function (value, key) {
    if (typeof key === 'object') {
      // ignore key
      return;
    }

    object[String(key)] = value;
  });
  return object;
}

function stringify(value, space) {
  return JSON.stringify(value, function (key, objectValue) {
    if (objectValue instanceof Map) {
      return map2object(objectValue);
    }

    if (objectValue instanceof Error) {
      return {
        message: objectValue.message,
        stack: objectValue.stack
      };
    }

    return objectValue;
  }, space);
}

function format(record) {
  return stringify({
    key: record.key,
    level: record.level,
    datetime: record.datetime,
    message: record.message,
    metadata: record.metadata,
    extra: record.extra
  });
}

exports["default"] = format;
//# sourceMappingURL=index-browser-dev.cjs.js.map
