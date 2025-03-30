import { LoggerCLI } from "nightingale";

[new LoggerCLI("ansi"), new LoggerCLI("json", { json: true })].forEach(
  (logger) => {
    logger.group("group", () => {
      logger.info("Hello, world!");
    });
    logger.infoJsonOnly("detailed", {
      test: "test",
    });
  },
);
