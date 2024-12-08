import levelNames from 'nightingale-level-names';

/* eslint-disable camelcase */
class WinstonAdapterHandler {
  constructor(winstonTransport, minLevel) {
    this.minLevel = minLevel;
    this.handle = record => {
      // new Promise((resolve, reject) => {
      winstonTransport.log(record.level, record.message, {
        level_name: levelNames.get(record.level),
        key: record.key,
        metadata: record.metadata,
        extra: record.extra,
        context: record.context
      }, err => {
        if (err) {
          // eslint-disable-next-line no-console
          console.warn(err);
          // return reject(err);
        }

        // resolve();
      });
      // });
    };
  }
}

export { WinstonAdapterHandler };
//# sourceMappingURL=index-node20.mjs.map
