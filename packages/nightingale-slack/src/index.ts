import { post } from 'request';
import type {
  LogRecord,
  Handle,
  Metadata,
  Handler,
  Level,
} from 'nightingale-types';
import type SlackConfig from './SlackConfig';
import createBody from './createBody';

export { createBody };

const createHandler = (slackConfig: SlackConfig) => <T extends Metadata>(
  record: LogRecord<T>,
) => {
  const body = createBody(record, slackConfig);

  post({ url: slackConfig.webhookUrl, body, json: true }).on(
    'error',
    (err2: Error) => console.error(err2.stack),
  );
};

export class SlackHandler implements Handler {
  minLevel: Level;

  handle: Handle;

  constructor(slackConfig: SlackConfig, minLevel: Level) {
    this.minLevel = minLevel;
    this.handle = createHandler(slackConfig);
  }
}

/** @deprecated use named export instead */
export default SlackHandler;
