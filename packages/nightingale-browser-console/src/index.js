import AbstractHandler from 'nightingale-handler';
import levels from 'nightingale-levels';
import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';

/**
 * @param {int} minLevel
 */
export default class BrowserConsoleHandler extends AbstractHandler {
    constructor(minLevel) {
        super(minLevel, browserConsoleFormatter, consoleOutput);
    }
}
