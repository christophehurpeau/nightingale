import { POB_TARGET } from 'pob-babel';
import type {
  addBreadcrumb,
  captureException,
  captureMessage,
} from '@sentry/core';
import * as SentryNode from '@sentry/node';
import type { User } from '@sentry/types';
import { Severity } from '@sentry/types';
import Level from 'nightingale-levels';
import type { LogRecord, Handle, Metadata } from 'nightingale-types';

const mapToSentryLevel: Record<Level, Severity> = {
  [Level.TRACE]: Severity.Debug,
  [Level.DEBUG]: Severity.Debug,
  [Level.INFO]: Severity.Info,
  [Level.NOTICE]: Severity.Log,
  [Level.WARNING]: Severity.Warning,
  [Level.ERROR]: Severity.Error,
  [Level.CRITICAL]: Severity.Critical,
  [Level.FATAL]: Severity.Fatal,
  [Level.EMERGENCY]: Severity.Critical,
  // not a level
  [Level.ALL]: Severity.Error,
};

export interface MetadataWithError extends Metadata {
  error?: Error;
}

export interface Options {
  getUser?: <T extends MetadataWithError>(
    record: LogRecord<T>,
  ) => User | undefined;
  getTags?: <T extends MetadataWithError>(
    record: LogRecord<T>,
  ) => Record<string, string>;
  getBreadcrumbCategory?: <T extends Metadata>(
    record: LogRecord<T>,
  ) => string | undefined;
  getBreadcrumbType?: <T extends Metadata>(
    record: LogRecord<T>,
  ) => string | undefined;
  shouldSendAsException?: <T extends MetadataWithError>(
    record: LogRecord<T>,
  ) => boolean;
  shouldSendAsBreadcrumb?: <T extends Metadata>(
    record: LogRecord<T>,
  ) => boolean;
}

interface SentryRequiredMethods {
  addBreadcrumb: typeof addBreadcrumb;
  captureException: typeof captureException;
  captureMessage: typeof captureMessage;
}

const createHandler = <S extends SentryRequiredMethods>(
  Sentry: S,
  {
    getUser = () => undefined,
    getTags = () => ({}),
    getBreadcrumbCategory = () => undefined,
    getBreadcrumbType = () => undefined,
    shouldSendAsException = <T extends Metadata>(record: LogRecord<T>) =>
      record.metadata?.error !== undefined,
    shouldSendAsBreadcrumb = <T extends Metadata>(record: LogRecord<T>) =>
      false,
  }: Options = {},
): Handle => {
  return <T extends MetadataWithError>(record: LogRecord<T>) => {
    const { key, level, metadata, extra } = record;

    if (shouldSendAsException(record)) {
      const error = metadata?.error || record.message;

      const extraData: Record<string, unknown> = { ...metadata, ...extra };
      delete extraData.error;

      Sentry.captureException(error, {
        level: mapToSentryLevel[level] || Severity.Error,
        user: getUser(record),
        tags: {
          loggerKey: key,
          ...getTags(record),
        },
        extra: extraData,
      });
    } else if (shouldSendAsBreadcrumb(record)) {
      Sentry.addBreadcrumb({
        level: mapToSentryLevel[level] || Severity.Error,
        category: getBreadcrumbCategory(record),
        type: getBreadcrumbType(record),
        message: record.message,
        data: record.metadata,
        timestamp: record.datetime.getTime(),
      });
    }
  };
};

export default class SentryHandler<S extends SentryRequiredMethods> {
  minLevel: Level;

  handle: Handle;

  constructor(Sentry: string | S, minLevel: number, options?: Options) {
    this.minLevel = minLevel;
    if (POB_TARGET === 'node' && typeof Sentry === 'string') {
      console.warn(
        'nightingale-sentry: Passing DSN directly is deprecated, pass Sentry instead and init in your app.',
      );
      SentryNode.init({ dsn: Sentry });
      this.handle = createHandler(SentryNode, options);
    } else {
      this.handle = createHandler<S>(Sentry as S, options);
    }
  }
}
