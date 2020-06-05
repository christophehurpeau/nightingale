import { LogRecord, Handle } from 'nightingale-types';
import { post } from 'request';
import SlackConfig from './SlackConfig';
import createBody from './createBody';

const createHandler = (slackConfig: SlackConfig) => <T>(
  record: LogRecord<T>,
) => {
  const body = createBody(record, slackConfig);

  post({ url: slackConfig.webhookUrl, body, json: true }).on(
    'error',
    (err2: Error) => console.error(err2.stack),
  );
};

export default class SlackHandler {
  minLevel: number;

  handle: Handle;

  constructor(slackConfig: SlackConfig, minLevel: number) {
    this.minLevel = minLevel;
    this.handle = createHandler(slackConfig);
  }
}
