import type { Logger } from "nightingale";
import { listenUnhandledErrors } from "nightingale";

Error.stackTraceLimit = Infinity;

export const setup = (logger: Logger): void => {
  listenUnhandledErrors(logger);
};
