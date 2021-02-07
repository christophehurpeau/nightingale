/* eslint-disable camelcase */
import levelNames from 'nightingale-level-names';
import type {
  LogRecord,
  Level,
  Handle,
  Metadata,
  Handler,
} from 'nightingale-types';

export type LogCallback = (err: Error | null) => void;

export interface WinstonTransportType {
  log: (
    level: number,
    message: string,
    metadata: Record<string, unknown>,
    callback: LogCallback,
  ) => void;
}

export class WinstonAdapterHandler implements Handler {
  minLevel: Level;

  handle: Handle;

  constructor(winstonTransport: WinstonTransportType, minLevel: Level) {
    this.minLevel = minLevel;
    this.handle = <T extends Metadata>(record: LogRecord<T>) => {
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
            // eslint-disable-next-line no-console
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

/** @deprecated use named export instead */
export default WinstonAdapterHandler;
