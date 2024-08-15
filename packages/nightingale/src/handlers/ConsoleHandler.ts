import { POB_TARGET } from "pob-babel";
import { Level } from "nightingale-levels";
import type {
  IsHandling,
  Handle,
  LogRecord,
  Metadata,
  Handler,
} from "nightingale-types";
import { createFindDebugLevel } from "../debug/debug";
import { ANSIFormatter } from "../formatters/ANSIFormatter";
import { JSONFormatter } from "../formatters/JSONFormatter";
import { consoleOutput } from "../outputs/consoleOutput";

const defaultFormatter =
  POB_TARGET === "node" &&
  !process.stdout.isTTY &&
  process.env.NIGHTINGALE_CONSOLE_FORMATTER !== "ansi"
    ? JSONFormatter.format
    : ANSIFormatter.format;

const createHandle = (
  formatter = defaultFormatter,
  output = consoleOutput,
): Handle => {
  return <T extends Metadata>(record: LogRecord<T>): void => {
    output(formatter(record), record);
  };
};
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);

export interface ConsoleHandlerOptions {
  formatter?: <T extends Metadata>(record: LogRecord<T>) => string;
  output?: <T extends Metadata>(
    param: string[] | string,
    record: LogRecord<T>,
  ) => void;
  // compat with nightingale-app-console, not used yet
  theme?: "dark" | "light";
}

export class ConsoleHandler implements Handler {
  minLevel: Level = Level.ALL;

  isHandling: IsHandling;

  handle: Handle;

  constructor(minLevel: Level, options: ConsoleHandlerOptions = {}) {
    this.minLevel = minLevel;
    this.isHandling = (level: Level, key: string) =>
      level >= findDebugLevel(minLevel, key);
    this.handle = createHandle(options.formatter, options.output);
  }
}
