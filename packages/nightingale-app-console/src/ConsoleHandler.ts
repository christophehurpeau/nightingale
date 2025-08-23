import { BrowserConsoleHandler } from "nightingale";
import type { ConsoleHandler as TerminalConsoleHandler } from "nightingale";

export const ConsoleHandler:
  | typeof BrowserConsoleHandler
  | typeof TerminalConsoleHandler = BrowserConsoleHandler;
