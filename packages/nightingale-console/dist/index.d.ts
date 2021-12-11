import { Level } from 'nightingale-levels';
import type { IsHandling, Handle, LogRecord, Metadata, Handler } from 'nightingale-types';
interface ConsoleHandlerOptions {
    formatter?: <T extends Metadata>(record: LogRecord<T>) => string;
    output?: <T extends Metadata>(param: string | string[], record: LogRecord<T>) => void;
    theme?: 'dark' | 'light';
}
export declare class ConsoleHandler implements Handler {
    minLevel: Level;
    isHandling: IsHandling;
    handle: Handle;
    constructor(minLevel: Level, options?: ConsoleHandlerOptions);
}
export {};
//# sourceMappingURL=index.d.ts.map