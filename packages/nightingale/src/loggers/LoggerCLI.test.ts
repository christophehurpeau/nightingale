import { LoggerCLI } from "./LoggerCLI.ts";

const consoleLogSpy = import.meta.jest
  .spyOn(console, "log")
  .mockImplementation(() => {});

describe("LoggerCLI", () => {
  beforeEach(() => {
    consoleLogSpy.mockClear();
  });
  afterAll(() => {
    consoleLogSpy.mockRestore();
  });

  test("LoggerCLI", () => {
    import.meta.jest.useFakeTimers({
      now: new Date("2023-10-01T10:57:49.000Z"),
    });

    const logger = new LoggerCLI("test", { noColor: true });
    logger.info("Test message", { key: "value" });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'test 10:57:49 → Test message { key: "value" }',
    );
  });

  test("LoggerCLI JSON", () => {
    import.meta.jest.useFakeTimers({
      now: new Date("2023-10-01T10:57:49.000Z"),
    });

    const consoleLogSpy = import.meta.jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const logger = new LoggerCLI("test", { noColor: true, json: true });

    logger.info("Test message", { key: "value" });

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      1,
      JSON.stringify({
        key: "value",
        time: "10:57:49",
        message: "Test message",
      }),
    );
  });
});
