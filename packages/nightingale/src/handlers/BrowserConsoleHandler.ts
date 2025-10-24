import type {
  Handle,
  Handler,
  IsHandling,
  Level,
  LogRecord,
  Metadata,
} from "nightingale-types";
import { createFindDebugLevel } from "../debug/debug.ts";
import { getDebugString } from "../debug/getDebugString.ts";
import { BrowserConsoleFormatter } from "../formatters/BrowserConsoleFormatter.ts";
import { consoleOutput } from "../outputs/consoleOutput.ts";

// debug string can change any time (localStorage), so we need a new object each time.
const findDebugLevel = (minLevel: Level, key: string): Level =>
  createFindDebugLevel(getDebugString())(minLevel, key);

type Theme = "dark" | "light";

const getDefaultTheme = (): Theme => {
  try {
    const configInLocalStorage = localStorage.getItem("NIGHTINGALE_THEME");
    if (configInLocalStorage && configInLocalStorage === "dark") {
      return configInLocalStorage;
    }
  } catch {}
  return "light";
};

const createHandler = (theme: Theme = getDefaultTheme()): Handle => {
  const browserConsoleFormatter = new BrowserConsoleFormatter(theme);
  return <T extends Metadata>(record: LogRecord<T>) => {
    consoleOutput(browserConsoleFormatter.format(record), record);
  };
};

export interface BrowserConsoleHandlerOptions {
  theme?: Theme;
}

export class BrowserConsoleHandler implements Handler {
  minLevel: Level = 0;

  handle: Handle;

  isHandling: IsHandling;

  constructor(minLevel: Level, options: BrowserConsoleHandlerOptions = {}) {
    this.isHandling = (level: Level, key: string) =>
      level >= findDebugLevel(minLevel, key);

    this.handle = createHandler(options.theme);
  }
}
