import type { ComputedConfigForKey } from "nightingale-logger";
import { Level, Logger } from "nightingale-logger";
import type { Handler, Processor } from "nightingale-types";
import { ConsoleCLIHandler } from "../handlers/ConsoleCLIHandler";

export interface LoggerCLIOptions {
  displayName?: string;
  handlers?: Handler[];
  processors?: Processor[];
  json?: boolean;
}

export class LoggerCLI extends Logger {
  private handlers: Handler[];
  private processors: Processor[] = [];
  private json: boolean;
  constructor(
    key: string,
    { displayName, processors, json = false }: LoggerCLIOptions = {},
  ) {
    super(key, displayName);
    this.handlers = [new ConsoleCLIHandler(Level.INFO, { json })];
    this.processors = processors ?? [];
    this.json = json;
  }

  protected override getHandlersAndProcessors(
    recordLevel: number,
  ): ComputedConfigForKey {
    return {
      handlers: this.handlers,
      processors: this.processors,
    };
  }

  logJsonOnly(
    messageOrError: string,
    metadata: Record<string, unknown>,
    level: Level = Level.INFO,
  ): void {
    if (this.json) {
      this.log(messageOrError, metadata, level);
    }
  }

  debugJsonOnly(
    messageOrError: string,
    metadata: Record<string, unknown>,
  ): void {
    if (this.json) {
      this.debug(messageOrError, metadata);
    }
  }

  noticeJsonOnly(
    messageOrError: string,
    metadata: Record<string, unknown>,
  ): void {
    if (this.json) {
      this.notice(messageOrError, metadata);
    }
  }

  infoJsonOnly(
    messageOrError: string,
    metadata: Record<string, unknown>,
  ): void {
    if (this.json) {
      this.info(messageOrError, metadata);
    }
  }

  warnJsonOnly(
    messageOrError: string,
    metadata: Record<string, unknown>,
  ): void {
    if (this.json) {
      this.warn(messageOrError, metadata);
    }
  }

  group<T, Result extends Awaited<T> | Promise<T>>(
    name: string,
    fn: () => Result,
  ): Result extends Promise<infer V> ? Promise<V> : Awaited<T> {
    if (this.json) {
      return fn() as Result extends Promise<infer V> ? Promise<V> : Awaited<T>;
    } else {
      console.group(name);
      const result = fn();
      if (result instanceof Promise) {
        return result.finally(() => {
          console.groupEnd();
        }) as Result extends Promise<infer V> ? Promise<V> : never;
      } else {
        console.groupEnd();
        return result as Result extends Promise<infer V>
          ? Promise<V>
          : Awaited<T>;
      }
    }
  }
}
