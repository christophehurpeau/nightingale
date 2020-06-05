import Level from 'nightingale-levels';
export type { Level };
export declare type Styles = string[] | undefined;
export interface Metadata {
    [propName: string]: any;
}
export declare type MetadataStyles<T extends Metadata> = {
    [P in keyof T]?: any;
};
export interface LogRecord<T extends Metadata> {
    level: Level;
    key: string;
    displayName?: string;
    datetime: Date;
    message: string;
    context?: object;
    metadata?: T;
    extra?: object | any;
    symbol?: string;
    styles?: Styles;
    metadataStyles?: MetadataStyles<T>;
}
/** @deprecated use LogRecord instead */
export declare type Record<T extends Metadata> = LogRecord<T>;
export declare type IsHandling = (level: Level, key: string) => boolean;
export declare type Handle = <T extends Metadata>(record: Readonly<LogRecord<T>>) => false | void;
export interface Handler {
    minLevel: number;
    isHandling?: IsHandling;
    handle: Handle;
}
export declare type Processor = <T extends Metadata>(record: Readonly<LogRecord<T>>, context?: object) => void;
//# sourceMappingURL=index.d.ts.map