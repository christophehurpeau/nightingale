import {
  BrowserConsoleHandler,
  Level,
  Logger,
  ConsoleHandler as TerminalConsoleHandler,
  configure,
  listenUnhandledErrors,
} from "nightingale";
import { POB_TARGET } from "pob-babel";

export { configure, addConfig, levels, Level } from "nightingale";

export const ConsoleHandler:
  | typeof BrowserConsoleHandler
  | typeof TerminalConsoleHandler =
  POB_TARGET === "browser" ? BrowserConsoleHandler : TerminalConsoleHandler;

export const logger = new Logger("app");
export const appLogger = logger;

if (POB_TARGET !== "browser") {
  Error.stackTraceLimit = Infinity;
  listenUnhandledErrors(logger);
}

const appMinLevel = (() => {
  if (
    POB_TARGET !== "browser" &&
    process.env.NIGHTINGALE_APP_MIN_LEVEL !== undefined &&
    process.env.NIGHTINGALE_APP_MIN_LEVEL !== ""
  ) {
    return Number(process.env.NIGHTINGALE_APP_MIN_LEVEL);
  }
  return process.env.NODE_ENV !== "production" ? Level.DEBUG : Level.INFO;
})();

const libMinLevel =
  POB_TARGET !== "browser" &&
  process.env.NIGHTINGALE_LIB_MIN_LEVEL !== undefined &&
  process.env.NIGHTINGALE_LIB_MIN_LEVEL !== ""
    ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL)
    : Level.INFO;

configure(
  appMinLevel !== libMinLevel
    ? [
        {
          pattern: /^app(:|$)/,
          handlers: [new ConsoleHandler(appMinLevel)],
          stop: true,
        },
        {
          handlers: [new ConsoleHandler(libMinLevel)],
        },
      ]
    : [
        {
          handlers: [new ConsoleHandler(libMinLevel)],
        },
      ],
);
