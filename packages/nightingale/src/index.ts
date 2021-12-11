import { Logger } from 'nightingale-logger';

export { Logger } from 'nightingale-logger';
export { Level, Level as levels } from 'nightingale-levels';
export { configure, addConfig } from './config';

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
export function listenUnhandledErrors(
  logger: Logger = new Logger(
    'nightingale:listenUnhandledErrors',
    'UnhandledErrors',
  ),
): void {
  process.on('uncaughtException', (error) => {
    logger.error('uncaughtException', { error, unhandled: true });
  });
  process.on('unhandledRejection', (error) => {
    logger.error('unhandledRejection', { error, unhandled: true });
  });
}
