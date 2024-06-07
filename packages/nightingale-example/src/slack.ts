import { Logger, configure, Level } from "nightingale";
import { SlackHandler } from "nightingale-slack";

if (!process.env.WEBHOOK_URL) {
  throw new Error("Missing WEBHOOK_URL environment variable");
}

configure([
  {
    handlers: [
      new SlackHandler(
        {
          webhookUrl: process.env.WEBHOOK_URL,
        },
        Level.ALL,
      ),
    ],
  },
]);

const logger = new Logger("app");

logger.success("Test", { value: 1 });
