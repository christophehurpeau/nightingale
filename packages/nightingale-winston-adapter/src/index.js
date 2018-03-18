/* eslint camelcase:"off" */
import levelNames from 'nightingale-level-names';

type WinstonTransportType = {
  log: Function,
};

export default function WinstonAdapterHandler(
  winstonTransport: WinstonTransportType,
  minLevel: number,
) {
  this.minLevel = minLevel;
  this.handle = record =>
    new Promise((resolve, reject) => {
      winstonTransport.log(
        record.level,
        record.message,
        {
          level_name: levelNames.get(record.level),
          key: record.key,
          metadata: record.metadata,
          extra: record.extra,
          context: record.context,
        },
        err => {
          if (err) {
            return reject(err);
          }

          resolve();
        },
      );
    });
}
