import type { LogRecord, Metadata } from "nightingale-types";
import type { StyleFn } from "./formatObject.ts";
export declare function formatRecordToString<T extends Metadata>(record: LogRecord<T>, style: StyleFn): [string, ...string[]];
//# sourceMappingURL=formatRecordToString.d.ts.map