function map2object(map) {
  const object = {};
  map.forEach((value, key) => {
    if (typeof key === "object") {
      // ignore key
      return;
    }
    object[String(key)] = value;
  });
  return object;
}
function stringify(value, space) {
  return JSON.stringify(value, (key, objectValue) => {
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

export { format as default };
//# sourceMappingURL=index-node18.mjs.map
