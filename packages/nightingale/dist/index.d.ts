import Level from 'nightingale-levels';
import Logger from 'nightingale-logger';
/** @deprecated use named export instead */
export default Logger;
export { configure, addConfig } from './config';
export { Logger, Level, Level as levels };
/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
export declare function listenUnhandledErrors(logger?: Logger): void;
//# sourceMappingURL=index.d.ts.map