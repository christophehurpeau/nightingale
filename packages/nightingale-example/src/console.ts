import { ConsoleHandler, Level, Logger, configure } from "nightingale";

const logger = new Logger("console");

configure([{ handlers: [new ConsoleHandler(Level.ALL)] }]);

logger.log("log()");
logger.info("info()");
logger.warn("warn()");
logger.error("error()");
logger.alert("alert()");
logger.fatal("fatal()");
logger.debug("debug()");
logger.inspectValue("inspect()");
logger.inspectVar("varName", "inspectVar()");
logger.success("success()");

logger.info("types", {
  string: "string",
  number: 1,
  boolean: true,
  object: { key: "value" },
  array: ["item1", "item2"],
  null: null,
  undefined,
  date: new Date(),
  error: new Error("error"),
  regexp: /regexp/,
  symbol: Symbol("symbol"),
  bigint: BigInt(12_345_678_901),
  namedFn: function namedFn() {},
  anonymousFn: () => {},
  class: class Class {},
  set: new Set([1, 2, 3]),
  map: new Map([
    ["key1", "value1"],
    ["key2", "value2"],
  ]),
  "-0": -0,
});

function testWrap(): void {
  logger.wrap(testWrap, () => {
    console.log("log from testWrap");
  });
}
testWrap();

function testWrapWithMetadata(): void {
  logger.wrap(testWrap, { port: 3000 }, () => {
    console.log("log from testWrapWithMetadata");
  });
}
testWrapWithMetadata();

const timeStarted = logger.time();
setTimeout(() => {
  logger.timeEnd(timeStarted, "time");
}, 2000);
