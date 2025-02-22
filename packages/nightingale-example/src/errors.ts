import { ConsoleHandler, Level, Logger, configure } from "nightingale";

configure([
  {
    handlers: [new ConsoleHandler(Level.ALL)],
  },
]);

const logger = new Logger("app");

logger.error(new Error("test"));
logger.error("test", { error: new Error("test") });
