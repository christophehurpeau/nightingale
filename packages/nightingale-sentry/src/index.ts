import { init, withScope, Severity } from '@sentry/node';
import Level from 'nightingale-levels';
import type { LogRecord, Handle } from 'nightingale-types';

const mapToSentryLevel: Record<Level, string> = {
  [Level.TRACE]: 'debug',
  [Level.DEBUG]: 'debug',
  [Level.INFO]: 'info',
  [Level.NOTICE]: 'log',
  [Level.WARNING]: 'warning',
  [Level.ERROR]: 'error',
  [Level.CRITICAL]: 'critical',
  [Level.FATAL]: 'critical',
  [Level.EMERGENCY]: 'critical',
  // not a level
  [Level.ALL]: 'fatal',
};

export interface Options {
  getUser?: <T>(record: LogRecord<T>) => any;
  getTags?: <T>(record: LogRecord<T>) => any;
}

export interface MetadataWithError {
  error?: Error;
}

const createHandler = (
  dsn: string,
  { getUser, getTags }: Options = {},
): Handle => {
  init({ dsn });

  return <T extends MetadataWithError>(record: LogRecord<T>) => {
    const { key, level, metadata, extra } = record;
    const error = metadata?.error;

    if (!error) {
      return;
    }

    const extraData = { ...metadata, ...extra };
    delete extraData.error;

    withScope((scope) => {
      scope.setLevel((mapToSentryLevel[level] || 'error') as Severity);
      scope.setTag('loggerKey', key);

      if (extraData) {
        Object.keys(extraData).forEach((key) => {
          scope.setExtra(key, extraData[key]);
        });
      }
      if (getUser) {
        const user = getUser(record);
        if (user) scope.setUser(user);
      }
      if (getTags) {
        const tags = getTags(record);
        if (tags) {
          Object.keys(tags).forEach((key) => {
            scope.setTag(key, tags[key]);
          });
        }
      }
    });
  };
};

export default class SentryHandler {
  minLevel: Level;

  handle: Handle;

  constructor(ravenUrl: string, minLevel: number, options?: Options) {
    this.minLevel = minLevel;
    this.handle = createHandler(ravenUrl, options);
  }
}
