import { Client as RavenClient } from 'raven';
import levels from 'nightingale-levels';

const mapToSentryLevel = {
  [levels.TRACE]: 'debug',
  [levels.DEBUG]: 'debug',
  [levels.INFO]: 'info',
  [levels.WARNING]: 'warning',
  [levels.ERROR]: 'error',
  [levels.FATAL]: 'fatal',
  [levels.EMERGENCY]: 'fatal',
};

const createHandler = (ravenUrl) => {
  const ravenClient = new RavenClient(ravenUrl);

  return ({ level, metadata, extra }) => {
    let error = metadata && metadata.error;

    if (!error) {
      return;
    }

    const extraData = { ...metadata, extra };
    delete extraData.error;

    if (error.originalError) {
      // error-processor
      extraData.parsedStack = error.stackTrace.toArray();
      error = error.originalError;
    }

    ravenClient.captureError(
      error,
      {
        level: mapToSentryLevel[level] || 'error',
        extra: extraData,
      },
    );
  };
};

export default function SentryHandler(ravenUrl: string, minLevel: number) {
  this.minLevel = minLevel;
  this.handle = createHandler(ravenUrl);
}
