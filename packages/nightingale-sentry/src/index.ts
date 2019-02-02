import { Client as RavenClient, CaptureOptions } from 'raven';
import { LogRecord, Handle } from 'nightingale-types';
import Level from 'nightingale-levels';

const mapToSentryLevel: { [level: number]: string } = {
  [Level.TRACE]: 'debug',
  [Level.DEBUG]: 'debug',
  [Level.INFO]: 'info',
  [Level.WARNING]: 'warning',
  [Level.ERROR]: 'error',
  [Level.FATAL]: 'fatal',
  [Level.EMERGENCY]: 'fatal',
};

export interface Options {
  getUser?: <T>(record: LogRecord<T>) => any;
  getTags?: <T>(record: LogRecord<T>) => any;
  getReq?: <T>(record: LogRecord<T>) => any;
}

export interface MetadataWithError {
  error?: Error;
}

const createHandler = (
  ravenUrl: string,
  { getUser = () => {}, getTags = () => {}, getReq = () => {} }: Options = {},
): Handle => {
  const ravenClient = new RavenClient(ravenUrl);

  return <T extends MetadataWithError>(record: LogRecord<T>) => {
    const { key, level, metadata, extra } = record;
    const error = metadata && metadata.error;

    if (!error) {
      return;
    }

    const extraData = Object.assign({}, metadata, extra);
    delete extraData.error;

    ravenClient.captureException(error, {
      logger: key, // logger is not in CaptureOptions but should work: merged later. TODO check and make a PR
      level: mapToSentryLevel[level] || 'error',
      extra: extraData,
      user: getUser(record),
      tags: getTags(record),
      req: getReq(record),
    } as CaptureOptions);
  };
};

export default class SentryHandler {
  public minLevel: Level;

  public handle: Handle;

  public constructor(ravenUrl: string, minLevel: number, options?: Options) {
    this.minLevel = minLevel;
    this.handle = createHandler(ravenUrl, options);
  }
}
