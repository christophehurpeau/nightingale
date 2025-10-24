import { Level } from "nightingale-levels";
import type {
  Handle,
  Handler,
  IsHandling,
  LogRecord,
  Metadata,
} from "nightingale-types";
import { createFindDebugLevel } from "../debug/debug.ts";
import { ANSIFormatter } from "../formatters/ANSIFormatter.ts";
import { JSONFormatter } from "../formatters/JSONFormatter.ts";
import { RawFormatter } from "../formatters/RawFormatter.ts";
import { cliConsoleOutput } from "../outputs/cliConsoleOutput.ts";
import { consoleOutput } from "../outputs/consoleOutput.ts";

const createHandle = ({
  json,
  noColor = process.env.NO_COLOR === "1" || process.env.NO_COLOR === "true",
}: ConsoleCLIHandlerOptions): Handle => {
  const formatter = (() => {
    if (json) return JSONFormatter.format;
    if (noColor) return RawFormatter.format;
    return ANSIFormatter.format;
  })();
  const output = json ? consoleOutput : cliConsoleOutput;
  return <T extends Metadata>(record: LogRecord<T>): void => {
    output(formatter(record), record);
  };
};
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);

export interface ConsoleCLIHandlerOptions {
  json?: boolean;
  noColor?: boolean;
}

export class ConsoleCLIHandler implements Handler {
  minLevel: Level = Level.ALL;

  isHandling: IsHandling;

  handle: Handle;

  constructor(minLevel: Level, options: ConsoleCLIHandlerOptions = {}) {
    this.minLevel = minLevel;
    this.isHandling = (level: Level, key: string) =>
      level >= findDebugLevel(minLevel, key);
    this.handle = createHandle(options);
  }
}
