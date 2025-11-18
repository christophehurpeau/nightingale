import type { ComputedConfigForKey } from "nightingale-logger";
import { Level, Logger } from "nightingale-logger";
import type { Processor } from "nightingale-types";
export interface LoggerCLIOptions {
    displayName?: string;
    processors?: Processor[];
    json?: boolean;
    noColor?: boolean;
}
export declare class LoggerCLI extends Logger {
    private handlers;
    private processors;
    private json;
    constructor(key: string, { displayName, processors, json, noColor }?: LoggerCLIOptions);
    protected getHandlersAndProcessors(recordLevel: number): ComputedConfigForKey;
    logJsonOnly(messageOrError: string, metadata: Record<string, unknown>, level?: Level): void;
    debugJsonOnly(messageOrError: string, metadata: Record<string, unknown>): void;
    noticeJsonOnly(messageOrError: string, metadata: Record<string, unknown>): void;
    infoJsonOnly(messageOrError: string, metadata: Record<string, unknown>): void;
    warnJsonOnly(messageOrError: string, metadata: Record<string, unknown>): void;
    group<T, Result extends Awaited<T> | Promise<T>>(name: string, fn: () => Result): Result extends Promise<infer V> ? Promise<V> : Awaited<T>;
    separator(): void;
}
//# sourceMappingURL=LoggerCLI.d.ts.map