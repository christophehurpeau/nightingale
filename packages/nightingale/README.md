springbokjs-logger
==================

[![Build Status](https://drone.io/github.com/christophehurpeau/springbokjs-logger/status.png)](https://drone.io/github.com/christophehurpeau/springbokjs-logger/latest)

See the [auto-generated docs](http://christophehurpeau.github.io/springbokjs-logger/docs/)

### How to use


```js
var LoggerConsole = require('springbokjs-logger/console');
var logger = new LoggerConsole();
logger.setPrefix('[app] ');
logger.log('This is a log');
logger.warn('This is a warning !');
logger.write('test ' + logger.blue.bold('This is blue and bold')).write(' keep writing log').nl();
```
