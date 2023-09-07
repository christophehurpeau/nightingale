import type {
  LogRecord,
  Handle,
  Metadata,
  Handler,
  Level,
} from 'nightingale-types';
import type { SlackConfig } from './SlackConfig';
import createBody from './createBody';

export type { SlackConfig } from './SlackConfig';

export { default as createBody } from './createBody';

// temp fix for global fetch: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/60924
/// <reference lib="whatwg-fetch" />

const createHandler =
  (slackConfig: SlackConfig) =>
  <T extends Metadata>(record: LogRecord<T>) => {
    const body = createBody(record, slackConfig);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    fetch(slackConfig.webhookUrl, {
      method: 'POST',
      body: JSON.stringify(body),
    }).catch((error: Error) => {
      console.error(error.stack);
    });
  };

export class SlackHandler implements Handler {
  minLevel: Level;

  handle: Handle;

  constructor(slackConfig: SlackConfig, minLevel: Level) {
    this.minLevel = minLevel;
    this.handle = createHandler(slackConfig);
  }
}
