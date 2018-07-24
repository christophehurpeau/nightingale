/* eslint camelcase:"off" */
import levelNames from 'nightingale-level-names';
import { Record, Level, Handle } from 'nightingale-types';

export type LogCallback = (err: Error | null) => void;

export interface WinstonTransportType {
  log: (
    level: number,
    message: string,
    metadata: object,
    callback: LogCallback,
  ) => void;
}

export default class WinstonAdapterHandler {
  minLevel: Level;

  handle: Handle;

  constructor(winstonTransport: WinstonTransportType, minLevel: number) {
    this.minLevel = minLevel;
    this.handle = <T>(record: Record<T>) => {
      // new Promise((resolve, reject) => {
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
        (err) => {
          if (err) {
            console.warn(err);
            // return reject(err);
          }

          // resolve();
        },
      );
      // });
    };
  }
}
