import { Logger, configure, Level } from "nightingale";
import { ConsoleHandler } from "nightingale-console";

configure([
  { handlers: [new ConsoleHandler(Level.ALL)] },
  {
    pattern: /^app/,
    handlers: [new ConsoleHandler(Level.ALL)],
  },
]);

const appLogger = new Logger("app");

const worker1Logger = new Logger("app:worker1");
const worker2Logger = new Logger("app:worker2");

[appLogger, worker1Logger, worker2Logger].forEach((logger) => {
  setTimeout(() => {
    logger.log("log()");
  }, Math.floor(Math.random() * 100));
  setTimeout(() => {
    logger.info("info()");
  }, Math.floor(Math.random() * 100));
  setTimeout(() => {
    logger.warn("warn()");
  }, Math.floor(Math.random() * 100));
  setTimeout(() => {
    logger.error("error()");
  }, Math.floor(Math.random() * 100));
  setTimeout(() => {
    logger.alert("alert()");
  }, Math.floor(Math.random() * 100));
  setTimeout(() => {
    logger.fatal("fatal()");
  }, Math.floor(Math.random() * 100));
  setTimeout(() => {
    logger.debug("debug()");
  }, Math.floor(Math.random() * 100));
});
