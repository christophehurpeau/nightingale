var lib = '../lib/';
var Logger = require(lib + 'console').LoggerConsole;

var logger = new Logger();

logger.log.call(null, 'test');

logger.time('test');
setTimeout(logger.timeEnd.bind(null, 'test'), 200);
