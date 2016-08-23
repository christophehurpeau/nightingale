import Logger from 'nightingale-logger';

export default from 'nightingale-logger';
export { configure, addConfig, addGlobalProcessor, addGlobalHandler } from './config';
export { default as levels } from 'nightingale-levels';

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
export function listenUnhandledErrors(logger) {
    if (!logger) logger = new Logger();
    process.on('uncaughtException', err => logger.error('uncaughtException', { err }));
    process.on('unhandledRejection', err => logger.error('unhandledRejection', { err }));
}
