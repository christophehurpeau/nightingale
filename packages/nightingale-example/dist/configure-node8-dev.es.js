import Logger, { configure, Level } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

configure([{
  stop: true,
  key: 'app',
  handlers: [new ConsoleHandler(Level.DEBUG)]
}, {
  stop: true,
  pattern: /^app:service:/,
  handlers: [new ConsoleHandler(Level.INFO)]
}, {
  handlers: [new ConsoleHandler(Level.ALL)]
}]);
const smthg = new Logger('smthg');
const app = new Logger('app');
const appService = new Logger('app:service:myService:insideMyService');
smthg.trace('shoud appear 1');
app.trace('shoud not appear');
app.info('shoud appear 2');
appService.trace('shoud not appear');
appService.debug('shoud not appear');
appService.info('shoud appear 3');
//# sourceMappingURL=configure-node8-dev.es.js.map
