import AbstractHandler from 'nightingale-handler';
import sentryOutput from 'nightingale-sentry-output';

/**
 * @param {int} minLevel
 */
export default class SentryHandler extends AbstractHandler {
    constructor(ravenUrl, minLevel) {
        super(minLevel, () => {}, sentryOutput(ravenUrl));
    }
}
