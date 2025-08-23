import * as util from "node:util";

export const inspectValue = (value: unknown): string =>
  // Note: inspect is a special function for node:
  // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
  util.inspect(value, { depth: 6 });
