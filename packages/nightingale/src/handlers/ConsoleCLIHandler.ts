import { Level } from "nightingale-levels";
import type {
  Handle,
  Handler,
  IsHandling,
  LogRecord,
  Metadata,
} from "nightingale-types";
import { createFindDebugLevel } from "../debug/debug";
import { ANSIFormatter } from "../formatters/ANSIFormatter";
import { JSONFormatter } from "../formatters/JSONFormatter";
import { cliConsoleOutput } from "../outputs/cliConsoleOutput";
import { consoleOutput } from "../outputs/consoleOutput";

const createHandle = ({ json }: ConsoleCLIHandlerOptions): Handle => {
  const formatter = json ? JSONFormatter.format : ANSIFormatter.format;
  const output = json ? consoleOutput : cliConsoleOutput;
  return <T extends Metadata>(record: LogRecord<T>): void => {
    output(formatter(record), record);
  };
};
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);

export interface ConsoleCLIHandlerOptions {
  json?: boolean;
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
