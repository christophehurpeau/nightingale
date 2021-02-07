import type Level from 'nightingale-levels';
export type { Level };
export declare type Styles = string[] | undefined;
export interface Metadata {
    context?: Record<string, unknown>;
    [propName: string]: unknown;
}
export declare type MetadataStyles<T extends Metadata> = {
    [P in keyof T]?: Styles;
};
export interface LogRecord<T extends Metadata> {
    level: Level;
    key: string;
    displayName?: string;
    datetime: Date;
    message: string;
    context?: Record<string, unknown>;
    metadata?: T;
    extra?: Record<string, unknown>;
    symbol?: string;
    styles?: Styles;
    metadataStyles?: MetadataStyles<T>;
}
export declare type IsHandling = (level: Level, key: string) => boolean;
export declare type Handle = <T extends Metadata>(record: Readonly<LogRecord<T>>) => false | void;
export interface Handler {
    minLevel: Level;
    isHandling?: IsHandling;
    handle: Handle;
}
export declare type Processor = <T extends Metadata>(record: Readonly<LogRecord<T>>, context?: Record<string, unknown>) => void;
//# sourceMappingURL=index.d.ts.map