import { Level, Logger, configure } from "nightingale";
import { ConsoleHandler } from "./ConsoleHandler.ts";
import { setup } from "./setup.ts";

export { configure, addConfig, levels, Level } from "nightingale";

export const logger = new Logger("app");
export const appLogger = logger;

setup(logger);

const appMinLevel = (() => {
  if (
    process.env.NIGHTINGALE_APP_MIN_LEVEL !== undefined &&
    process.env.NIGHTINGALE_APP_MIN_LEVEL !== ""
  ) {
    return Number(process.env.NIGHTINGALE_APP_MIN_LEVEL);
  }
  return process.env.NODE_ENV !== "production" ? Level.DEBUG : Level.INFO;
})();

const libMinLevel =
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
