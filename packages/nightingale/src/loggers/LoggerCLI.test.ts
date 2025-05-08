import { LoggerCLIString } from "./LoggerCLI";

describe("LoggerCLI", () => {
  test("LoggerCLIString", () => {
    import.meta.jest.useFakeTimers({
      now: new Date("2023-10-01T10:57:49.000Z"),
    });

    const consoleLogSpy = import.meta.jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    const logger = new LoggerCLIString("test", { noColor: true });
    logger.info("Test message", { key: "value" });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'test 10:57:49 → Test message { key: "value" }',
    );
  });
});
