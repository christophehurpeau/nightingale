import { Logger } from "nightingale-logger";

export { Logger } from "nightingale-logger";
export { Level, Level as levels } from "nightingale-levels";
export { configure, addConfig } from "./config.ts";
export * from "./formatter-utils/index.ts";
export { createFindDebugLevel } from "./debug/debug.ts";
export { RawFormatter } from "./formatters/RawFormatter.ts";
export { MarkdownFormatter } from "./formatters/MarkdownFormatter.ts";
export { JSONFormatter } from "./formatters/JSONFormatter.ts";
export { ANSIFormatter } from "./formatters/ANSIFormatter.ts";
export { HTMLFormatter } from "./formatters/HTMLFormatter.ts";
export { BrowserConsoleFormatter } from "./formatters/BrowserConsoleFormatter.ts";
export { consoleOutput } from "./outputs/consoleOutput.ts";
export { StringHandler } from "./handlers/StringHandler.ts";
export { BrowserConsoleHandler } from "./handlers/BrowserConsoleHandler.ts";
export { ConsoleHandler } from "./handlers/ConsoleHandler.ts";
export { ConsoleCLIHandler } from "./handlers/ConsoleCLIHandler.ts";
export { LoggerCLI } from "./loggers/LoggerCLI.ts";
export { formatStyles } from "./formatter-utils/formatStyles.ts";

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
