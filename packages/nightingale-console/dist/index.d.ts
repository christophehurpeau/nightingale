import Level from 'nightingale-levels';
import type { IsHandling, Handle, LogRecord } from 'nightingale-types';
interface ConsoleHandlerOptions {
    formatter?: <T>(record: LogRecord<T>) => string;
    output?: <T>(param: string | string[], record: LogRecord<T>) => void;
}
export default class ConsoleHandler {
    minLevel: Level;
    isHandling: IsHandling;
    handle: Handle;
    constructor(minLevel: Level, options?: ConsoleHandlerOptions);
}
export {};
//# sourceMappingURL=index.d.ts.map