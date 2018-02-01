import { Client as RavenClient } from 'raven';
import levels from 'nightingale-levels';

import t from 'flow-runtime';
const mapToSentryLevel = {
  [levels.TRACE]: 'debug',
  [levels.DEBUG]: 'debug',
  [levels.INFO]: 'info',
  [levels.WARNING]: 'warning',
  [levels.ERROR]: 'error',
  [levels.FATAL]: 'fatal',
  [levels.EMERGENCY]: 'fatal'
};

const createHandler = (ravenUrl, { getUser = () => {}, getTags = () => {} } = {}) => {
  const ravenClient = new RavenClient(ravenUrl);

  return record => {
    const { key, level, metadata, extra } = record;
    let error = metadata && metadata.error;

    if (!error) {
      return;
    }

    const extraData = Object.assign({}, metadata, { extra });
    delete extraData.error;

    if (error.originalError) {
      // error-processor
      extraData.parsedStack = error.stackTrace.toArray();
      error = error.originalError;
    }

    ravenClient.captureException(error, {
      logger: key,
      level: mapToSentryLevel[level] || 'error',
      extra: extraData,
      user: getUser(record),
      tags: getTags(record)
    });
  };
};

export default function SentryHandler(ravenUrl, minLevel, options) {
  let _ravenUrlType = t.string();

  let _minLevelType = t.number();

  t.param('ravenUrl', _ravenUrlType).assert(ravenUrl);
  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this.handle = createHandler(ravenUrl, options);
}
//# sourceMappingURL=index.js.map