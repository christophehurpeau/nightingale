import { Logger, configure, Level, listenUnhandledErrors } from "nightingale";
import { ConsoleHandler } from "nightingale-console";

configure([{ handlers: [new ConsoleHandler(Level.INFO)] }]);
listenUnhandledErrors();

const logger = new Logger("nightingale:console");

logger.debug("test");
logger.info("test");
logger.warn("test");

// eslint-disable-next-line @typescript-eslint/no-floating-promises, no-new
new Promise((resolve, reject) => {
  reject(new Error("Testing uncaught error"));
});
