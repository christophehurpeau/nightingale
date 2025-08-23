import { ConsoleHandler as TerminalConsoleHandler } from "nightingale";
import type { BrowserConsoleHandler } from "nightingale";

export const ConsoleHandler:
  | typeof BrowserConsoleHandler
  | typeof TerminalConsoleHandler = TerminalConsoleHandler;
