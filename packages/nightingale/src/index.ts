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
export function listenUnhandledErrors(
  logger: Logger = new Logger(
    'nightingale:listenUnhandledErrors',
    'UnhandledErrors',
  ),
): void {
  process.on('uncaughtException', (error) =>
    logger.error('uncaughtException', { error, unhandled: true }),
  );
  process.on('unhandledRejection', (error) =>
    logger.error('unhandledRejection', { error, unhandled: true }),
  );
}
