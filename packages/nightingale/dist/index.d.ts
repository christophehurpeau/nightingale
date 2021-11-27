import { Logger } from 'nightingale-logger';
export { 
/** @deprecated use named export instead */
Logger as default, Logger, } from 'nightingale-logger';
export { Level, Level as levels } from 'nightingale-levels';
export { configure, addConfig } from './config';
/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
export declare function listenUnhandledErrors(logger?: Logger): void;
//# sourceMappingURL=index.d.ts.map