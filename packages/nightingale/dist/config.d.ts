import { Handler, Processor } from 'nightingale-types';
export interface Config {
    handler?: Handler;
    handlers?: Handler[];
    key?: string;
    keys?: string[];
    pattern?: RegExp;
    processor?: Processor;
    processors?: Processor[];
    stop?: boolean;
}
export declare function configure(config: Config[]): void;
export declare function addConfig(config: Config, unshift?: boolean): void;
//# sourceMappingURL=config.d.ts.map