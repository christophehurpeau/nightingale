import Logger from 'nightingale-logger';
import Level from 'nightingale-levels';
export default Logger;
export { configure, addConfig } from './config';
export { Level, Level as levels };
/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
export declare function listenUnhandledErrors(logger?: Logger): void;
