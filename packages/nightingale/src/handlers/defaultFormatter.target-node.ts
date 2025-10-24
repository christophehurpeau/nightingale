import { ANSIFormatter } from "../formatters/ANSIFormatter.ts";
import { JSONFormatter } from "../formatters/JSONFormatter.ts";

export const defaultFormatter =
  !process.stdout.isTTY && process.env.NIGHTINGALE_CONSOLE_FORMATTER !== "ansi"
    ? JSONFormatter.format
    : ANSIFormatter.format;
