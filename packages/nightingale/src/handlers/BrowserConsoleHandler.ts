import type {
  Handle,
  Handler,
  IsHandling,
  Level,
  LogRecord,
  Metadata,
} from "nightingale-types";
import { createFindDebugLevel } from "../debug/debug";
import { BrowserConsoleFormatter } from "../formatters/BrowserConsoleFormatter";
import { consoleOutput } from "../outputs/consoleOutput";

export function getDebugString(): string {
  const querystring = document.location.search;
  const debugFromLocalStorage =
    // eslint-disable-next-line unicorn/prefer-global-this, @typescript-eslint/no-unnecessary-condition
    window.localStorage?.getItem("debug") || "";

  if (!querystring) {
    return debugFromLocalStorage;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
  const debugFromQueryString = decodeURI(
    querystring.replace(
      // eslint-disable-next-line prefer-regex-literals, regexp/no-super-linear-backtracking
      new RegExp("^(?:.*[&?]DEBUG(?:=([^&]*))?)?.*$", "i"),
      "$1",
    ),
  );

  return (
    (debugFromLocalStorage ? `${debugFromLocalStorage},` : "") +
    debugFromQueryString
  );
}

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
