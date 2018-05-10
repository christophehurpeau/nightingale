import { Handler, Processor } from 'nightingale-types';
export interface Config {
    handler?: Handler;
    handlers?: Array<Handler>;
    key?: string;
    keys?: Array<string>;
    pattern?: RegExp;
    processor?: Processor;
    processors?: Array<Processor>;
    stop?: boolean;
}
export declare function configure(config: Array<Config>): void;
export declare function addConfig(config: Config, unshift?: boolean): void;
