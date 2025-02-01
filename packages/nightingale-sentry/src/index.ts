import type {
  addBreadcrumb,
  captureException,
  captureMessage,
} from "@sentry/core";
import type { SeverityLevel, User } from "@sentry/types";
import { Level } from "nightingale-levels";
import type { Handle, Handler, LogRecord, Metadata } from "nightingale-types";

const mapToSentryLevel: Record<Level, SeverityLevel> = {
  [Level.TRACE]: "debug",
  [Level.DEBUG]: "debug",
  [Level.INFO]: "info",
  [Level.NOTICE]: "log",
  [Level.WARNING]: "warning",
  [Level.ERROR]: "error",
  [Level.CRITICAL]: "fatal",
  [Level.FATAL]: "fatal",
  [Level.EMERGENCY]: "fatal",
  // not a level
  [Level.ALL]: "error",
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

export interface SentryRequiredMethods {
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
      record.metadata?.error !== undefined &&
      record.metadata.unhandled !== true,
    shouldSendAsBreadcrumb = <T extends Metadata>(record: LogRecord<T>) =>
      false,
  }: Options = {},
): Handle => {
  return <T extends MetadataWithError>(record: LogRecord<T>) => {
    const { key, level, metadata, extra, message } = record;

    if (shouldSendAsException(record)) {
      const error = metadata?.error || record.message;

      const extraData: Record<string, unknown> = {
        nightingaleErrorMessage: message,
        ...metadata,
        ...extra,
      };
      delete extraData.error;

      Sentry.captureException(error, {
        level: mapToSentryLevel[level] || "error",
        user: getUser(record),
        tags: {
          loggerKey: key,
          ...getTags(record),
        },
        extra: extraData,
      });
    } else if (shouldSendAsBreadcrumb(record)) {
      Sentry.addBreadcrumb({
        level: mapToSentryLevel[level] || "error",
        category: getBreadcrumbCategory(record),
        type: getBreadcrumbType(record),
        message: record.message,
        data: record.metadata,
        timestamp: record.datetime.getTime(),
      });
    }
  };
};

export class SentryHandler<S extends SentryRequiredMethods> implements Handler {
  minLevel: Level;

  handle: Handle;

  constructor(Sentry: S, minLevel: Level, options?: Options) {
    this.minLevel = minLevel;
    this.handle = createHandler<S>(Sentry, options);
  }
}
