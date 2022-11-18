import { createBrowserConsoleFormatter } from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import { createFindDebugLevel } from 'nightingale-debug';
import type {
  Level,
  Handle,
  IsHandling,
  LogRecord,
  Metadata,
  Handler,
} from 'nightingale-types';
import { getDebugString } from './debug';

// debug string can change any time (localStorage), so we need a new object each time.
const findDebugLevel = (minLevel: Level, key: string): Level =>
  createFindDebugLevel(getDebugString())(minLevel, key);

type Theme = 'light' | 'dark';

const getDefaultTheme = (): Theme => {
  try {
    const configInLocalStorage = localStorage.getItem('NIGHTINGALE_THEME');
    if (configInLocalStorage && configInLocalStorage === 'dark') {
      return configInLocalStorage;
    }
  } catch {}
  return 'light';
};

const createHandler = (theme: Theme = getDefaultTheme()): Handle => {
  const browserConsoleFormatter = createBrowserConsoleFormatter(theme);
  return <T extends Metadata>(record: LogRecord<T>) => {
    consoleOutput(browserConsoleFormatter(record), record);
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
