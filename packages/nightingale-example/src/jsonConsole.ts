import {
  JSONFormatter,
  Level,
  Logger,
  configure,
  consoleOutput,
} from "nightingale";
import type { Handler, LogRecord, Metadata } from "nightingale-types";

class JSONHandler implements Handler {
  minLevel: Level;

  constructor(minLevel: Level) {
    this.minLevel = minLevel;
  }

  handle<T extends Metadata>(record: LogRecord<T>): void {
    consoleOutput(JSONFormatter.format(record), record);
  }
}

configure([
  {
    handlers: [new JSONHandler(Level.ALL)],
  },
]);

const logger = new Logger("app");

logger.log("test");

const timeStarted = logger.time();
setTimeout(() => {
  logger.timeEnd(timeStarted, "time measured");
}, 2000);

logger.success("Listening", { port: 3000 }, { port: ["yellow"] });
