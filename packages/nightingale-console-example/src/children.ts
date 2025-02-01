import { ConsoleHandler, Level, Logger, configure } from "nightingale";

configure([{ handlers: [new ConsoleHandler(Level.INFO)] }]);

const nightingaleLogger = new Logger("nightingale");

nightingaleLogger.setContext({ nightingale: true });
nightingaleLogger.info("test");

const logger = nightingaleLogger.child("console");
logger.setContext({ nightingaleConsole: true });

logger.info("test");
