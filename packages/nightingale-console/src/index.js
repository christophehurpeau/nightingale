import AbstractHandler from 'nightingale-handler';
import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';

/**
 * @param {int} minLevel
 */
export default class ConsoleHandler extends AbstractHandler {
    constructor(minLevel) {
        super(minLevel, formatterANSI, consoleOutput);
    }
}
