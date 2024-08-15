import * as Sentry from "@sentry/node";
import {
  Logger,
  configure,
  Level,
  listenUnhandledErrors,
  ConsoleHandler,
} from "nightingale";
import { SentryHandler } from "nightingale-sentry";

if (!process.env.SENTRY_DSN) {
  throw new Error("SENTRY_DSN missing");
}

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

configure([
  {
    handlers: [
      new SentryHandler(Sentry, Level.INFO, {
        shouldSendAsBreadcrumb: () => true,
      }),
      new ConsoleHandler(Level.INFO),
    ],
  },
]);
listenUnhandledErrors();

const logger = new Logger("nightingale:console");

logger.debug("test");
logger.info("test");
logger.warn("test");
logger.error(new Error("Test error with breadcrumbs"));

// eslint-disable-next-line @typescript-eslint/no-floating-promises, no-new
new Promise((resolve, reject) => {
  reject(new Error("Testing uncaught error"));
});
