import type {
  Handle,
  Handler,
  Level,
  LogRecord,
  Metadata,
} from "nightingale-types";
import type { SlackConfig } from "./SlackConfig";
import createBody from "./createBody";

export type { SlackConfig } from "./SlackConfig";

export { default as createBody } from "./createBody";

const createHandler =
  (slackConfig: SlackConfig) =>
  <T extends Metadata>(record: LogRecord<T>) => {
    const body = createBody(record, slackConfig);

    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    fetch(slackConfig.webhookUrl, {
      method: "POST",
      body: JSON.stringify(body),
    }).catch((error: unknown) => {
      console.error(error);
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
