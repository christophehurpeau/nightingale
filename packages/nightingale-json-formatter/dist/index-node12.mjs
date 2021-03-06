function map2object(map) {
  const object = {};
  map.forEach((value, key) => {
    if (typeof key === 'object') {
      // ignore key
      return;
    }

    object[String(key)] = value;
  });
  return object;
}

function stringify(value, space) {
  return JSON.stringify(value, (key, value) => {
    if (value instanceof Map) {
      return map2object(value);
    }

    if (value instanceof Error) {
      return {
        message: value.message,
        stack: value.stack
      };
    }

    return value;
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

export default format;
//# sourceMappingURL=index-node12.mjs.map
