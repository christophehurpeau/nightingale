import { LoggerCLI } from "nightingale";

for (const logger of [
  new LoggerCLI("ansi"),
  new LoggerCLI("json", { json: true }),
]) {
  console.log(`Logger: ${logger.key}`);

  logger.group("group", () => {
    logger.info("Hello, world!");
  });
  logger.infoJsonOnly("detailed", {
    test: "test",
  });

  await logger.group("async group", async () => {
    logger.info("Hello, world!");
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    logger.info("Hello, world! after 1 second");
  });

  logger.info("End!");
}
