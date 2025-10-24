import levelNames from 'nightingale-level-names';

class WinstonAdapterHandler {
  constructor(winstonTransport, minLevel) {
    this.minLevel = minLevel;
    this.handle = (record) => {
      winstonTransport.log(
        record.level,
        record.message,
        {
          level_name: levelNames.get(record.level),
          key: record.key,
          metadata: record.metadata,
          extra: record.extra,
          context: record.context
        },
        (err) => {
          if (err) {
            console.warn(err);
          }
        }
      );
    };
  }
}

export { WinstonAdapterHandler };
//# sourceMappingURL=index-node22.mjs.map
