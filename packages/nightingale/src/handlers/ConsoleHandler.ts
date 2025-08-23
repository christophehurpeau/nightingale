import { Level } from "nightingale-levels";
import type {
  Handle,
  Handler,
  IsHandling,
  LogRecord,
  Metadata,
} from "nightingale-types";
import { createFindDebugLevel } from "../debug/debug";
import type { NightingaleFormatter } from "../formatter-utils";
import { consoleOutput } from "../outputs/consoleOutput";
import { defaultFormatter } from "./defaultFormatter";

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
  formatter?: NightingaleFormatter["format"];
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
