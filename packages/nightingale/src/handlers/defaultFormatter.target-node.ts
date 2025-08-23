import { ANSIFormatter } from "../formatters/ANSIFormatter";
import { JSONFormatter } from "../formatters/JSONFormatter";

export const defaultFormatter =
  !process.stdout.isTTY && process.env.NIGHTINGALE_CONSOLE_FORMATTER !== "ansi"
    ? JSONFormatter.format
    : ANSIFormatter.format;
