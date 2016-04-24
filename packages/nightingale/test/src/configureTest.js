import Logger, { configure, levels } from '../..';
import ConsoleHandler from 'nightingale-console';

configure([
    {
        handlers: [new ConsoleHandler(levels.ALL)],
    },
    {
        patterns: ['app'],
        handlers: [new ConsoleHandler(levels.DEBUG)],
    },
    {
        patterns: ['app.service.**'],
        handlers: [new ConsoleHandler(levels.INFO)],
    },
]);

const smthg = new Logger('smthg');
const app = new Logger('app');
const appService = new Logger('app.service.myService.insideMyService');

smthg.trace('shoud appear 1');
app.trace('shoud notappear');
app.info('shoud appear 2');
appService.trace('shoud not appear');
appService.debug('shoud not appear');
appService.info('shoud appear 3');
