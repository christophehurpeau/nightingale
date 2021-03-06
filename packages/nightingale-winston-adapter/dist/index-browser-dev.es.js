import levelNames from 'nightingale-level-names';

/* eslint-disable camelcase */
var WinstonAdapterHandler = function WinstonAdapterHandler(winstonTransport, minLevel) {
  this.minLevel = minLevel;

  this.handle = function (record) {
    // new Promise((resolve, reject) => {
    winstonTransport.log(record.level, record.message, {
      level_name: levelNames.get(record.level),
      key: record.key,
      metadata: record.metadata,
      extra: record.extra,
      context: record.context
    }, function (err) {
      if (err) {
        // eslint-disable-next-line no-console
        console.warn(err); // return reject(err);
      } // resolve();

    }); // });
  };
};

export default WinstonAdapterHandler;
export { WinstonAdapterHandler };
//# sourceMappingURL=index-browser-dev.es.js.map
