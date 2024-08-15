import { ConsoleHandler, configure, Level, Logger } from "nightingale";

export { configure, addConfig, levels, Level, Logger } from "nightingale";

const testMinLevel = (() => {
  if (
    process.env.NIGHTINGALE_TEST_MIN_LEVEL !== undefined &&
    process.env.NIGHTINGALE_TEST_MIN_LEVEL !== ""
  ) {
    return Number(process.env.NIGHTINGALE_TEST_MIN_LEVEL);
  }
  return process.env.NODE_ENV !== "production" ? Level.DEBUG : Level.INFO;
})();

const libMinLevel =
  process.env.NIGHTINGALE_LIB_MIN_LEVEL !== undefined &&
  process.env.NIGHTINGALE_LIB_MIN_LEVEL !== ""
    ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL)
    : Level.INFO;

export const testLogger = new Logger("unit-testing");

configure([
  {
    pattern: /^unit-testing(:|$)/,
    handlers: [new ConsoleHandler(testMinLevel)],
    stop: true,
  },
  {
    handlers: [new ConsoleHandler(libMinLevel)],
  },
]);
