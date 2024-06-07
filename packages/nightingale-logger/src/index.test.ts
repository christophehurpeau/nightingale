// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from "@jest/globals";
import { Logger } from ".";

test("key argument", () => {
  const key = "test";
  const logger = new Logger(key);
  expect(logger.key).toBe(key);
});

test("extends context", () => {
  const key = "test";
  const logger = new Logger(key);
  const context = { test1: true, test2: false };
  logger.setContext(context);
  expect(logger.getContextObject()).toBe(context);
  logger.extendsContext({ test2: true, test3: true });
  expect(logger.getContextObject()).toBe(context);
  expect(logger.getContextObject()).toStrictEqual({
    test1: true,
    test2: true,
    test3: true,
  });
});

test("extends undefined context", () => {
  const key = "test";
  const logger = new Logger(key);
  expect(logger.getContextObject()).toBe(undefined);
  expect(() => {
    logger.extendsContext({ test: true });
  }).toThrow(
    "Cannot extends context that does not exists. Use setContext(context) first.",
  );
});

test("passing error", () => {
  const error = new Error("Test");
  const logger = new Logger("test");
  logger.addRecord = jest.fn();
  logger.log(error);
  expect(logger.addRecord).toHaveBeenNthCalledWith(1, {
    context: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    datetime: expect.any(Date),
    displayName: undefined,
    extra: {},
    key: "test",
    level: 200,
    message: "Error: Test",
    metadata: { error },
  });
});
