import { Logger } from "nightingale-logger";

export { Logger } from "nightingale-logger";
export { Level, Level as levels } from "nightingale-levels";
export { configure, addConfig } from "./config";
export * from "./formatter-utils";
export { createFindDebugLevel } from "./debug/debug";
export { RawFormatter } from "./formatters/RawFormatter";
export { MarkdownFormatter } from "./formatters/MarkdownFormatter";
export { JSONFormatter } from "./formatters/JSONFormatter";
export { ANSIFormatter } from "./formatters/ANSIFormatter";
export { HTMLFormatter } from "./formatters/HTMLFormatter";
export { BrowserConsoleFormatter } from "./formatters/BrowserConsoleFormatter";
export { consoleOutput } from "./outputs/consoleOutput";
export { StringHandler } from "./handlers/StringHandler";
export { BrowserConsoleHandler } from "./handlers/BrowserConsoleHandler";
export { ConsoleHandler } from "./handlers/ConsoleHandler";
export { ConsoleCLIHandler } from "./handlers/ConsoleCLIHandler";
export { LoggerCLI } from "./loggers/LoggerCLI";

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
export function listenUnhandledErrors(
  logger: Logger = new Logger(
    "nightingale:listenUnhandledErrors",
    "UnhandledErrors",
  ),
): void {
  process.on("uncaughtException", (error) => {
    logger.error(error, {
      unhandled: true,
      type: "uncaughtException",
    });
  });
  process.on("unhandledRejection", (error) => {
    logger.error(error as Error, {
      unhandled: true,
      type: "unhandledRejection",
    });
  });
}
