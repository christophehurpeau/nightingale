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
    'nightingale.listenUnhandledErrors',
    'listenUnhandledErrors',
  ),
): void {
  process.on('uncaughtException', (err) =>
    logger.error('uncaughtException', { err }),
  );
  process.on('unhandledRejection', (err) =>
    logger.error('unhandledRejection', { err }),
  );
}
