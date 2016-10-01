### v4.9.0

- [`3e1db31`](https://github.com/nightingalejs/nightingale/commit/3e1db31b00a2a85f69a322f90c34184eaf6e06b0) update dependencies (Christophe Hurpeau)

### v4.8.0

- [`a645c25`](https://github.com/nightingalejs/nightingale/commit/a645c25e51740c9b6a000b401d19e92f3a8cf9f2) add logger.time() in example (Christophe Hurpeau)
- [`9eb9b9d`](https://github.com/nightingalejs/nightingale/commit/9eb9b9d9915b456f0cf1af6b98bc3ae716404cc6) upgrade pob and update dependencies (Christophe Hurpeau)

### v4.7.1

- [`63b6986`](https://github.com/nightingalejs/nightingale/commit/63b6986715a74b1a4695d969fc2f7d1403d95a46) listenUnhandledErrors logger name (Christophe Hurpeau)

### v4.7.0

- [`29f819d`](https://github.com/nightingalejs/nightingale/commit/29f819d57113e092c0e587a3d84374e459a01e22) listenUnhandledErrors (Christophe Hurpeau)

### v4.6.0

- [`aa0a783`](https://github.com/nightingalejs/nightingale/commit/aa0a78376d07f6a5ab3b34232bfed1e7ae67c3c2) config: function addConfig (Christophe Hurpeau)

### v4.5.0

- [`cbe90a8`](https://github.com/nightingalejs/nightingale/commit/cbe90a8b997deb9d0301f45723f149f24c699400) pob (Christophe Hurpeau)
- [`0d5a533`](https://github.com/nightingalejs/nightingale/commit/0d5a533212aa811c3a56b390ac20044755a84686) add badge travisci (Christophe Hurpeau)

### v4.4.0

- [`48b16cf`](https://github.com/nightingalejs/nightingale/commit/48b16cf6278427a74efb46c8bd371614bcf26887) update dependencies (Christophe Hurpeau)


### v4.3.1

- [`23fe946`](https://github.com/nightingalejs/nightingale/commit/23fe946813b42d4a8e44496e4de07919e99a4650) fix configure `pattern` and `handler` (Christophe Hurpeau)

### v4.3.0

You can use context to add data to each log.

```js
import Logger from 'nightingale';
const loggerMyService = new Logger('app.myService');

export function someAction(arg1) {
    const logger = loggerMyService.context({ arg1 });
    logger.info('starting');
    // do stuff
    logger.info('done');
}
```

- [`9ce737f`](https://github.com/nightingalejs/nightingale/commit/9ce737f7e10c819c22108f52f0768be4cbc24cfc) nightingale-logger, context and child (Christophe Hurpeau)
- [`f642e84`](https://github.com/nightingalejs/nightingale/commit/f642e8484bab9fdd48d06ea0bb0d2685552b2fc2) eslint dependencies (Christophe Hurpeau)

### v4.2.0

- [`563f196`](https://github.com/nightingalejs/nightingale/commit/563f19664df31908c79accb59f5093db2c0ce717) nightingale-logger@1.1.0, nightingale-json-formatter@1.1.0 (Christophe Hurpeau)

### v4.1.0

- [`025cf6a`](https://github.com/nightingalejs/nightingale/commit/025cf6ad56070e22b92f36fc5b9f5b75713190e2) nightingale-logger (Christophe Hurpeau)

### v4.0.0

- [`44bec38`](https://github.com/nightingalejs/nightingale/commit/44bec38b7f5dcd1ab2afeaee87d0a4c78db6fd29) nightingale v4 (Christophe Hurpeau)

### v3.0.5

- [`d207afe`](https://github.com/christophehurpeau/nightingale/commit/d207afe89c1759f451626285370b7e155f6040e7) springbokjs-library@15 (Christophe Hurpeau)
- [`21cd404`](https://github.com/christophehurpeau/nightingale/commit/21cd4041004597a9f0f0d2cd9fe62886b3ab2896) fix browser main field in package.json (Christophe Hurpeau)
- [`b4cfcdb`](https://github.com/christophehurpeau/nightingale/commit/b4cfcdb935d2f528240a2dd5a4b736cc19f140ac) build (Christophe Hurpeau)

### v3.0.4

- [`aea18e7`](https://github.com/christophehurpeau/nightingale/commit/aea18e71c21cf655d03ab22e92348491c65551d6) fix minLevel when is set to LogLevel.ALL (Christophe Hurpeau)

### v3.0.3

- [`3af8094`](https://github.com/christophehurpeau/nightingale/commit/3af80947085d2fe4e7ed7301821110debd743a53) fix when contextStyles is undefined (Christophe Hurpeau)

### v3.0.2

- [`2a26228`](https://github.com/christophehurpeau/nightingale/commit/2a2622876c4b4dc8d4fa5fddbb86a16a080f5c86) fix debugFromLocalStorage in browser (Christophe Hurpeau)

### v3.0.1

- [`9bd710a`](https://github.com/christophehurpeau/nightingale/commit/9bd710a84875a3c44b51f3134ea02650bd57d04c) fix previous commit :/ (Christophe Hurpeau)

### v3.0.0

```
import { ConsoleLogger, LogLevel } from 'nightingale';
const logger = new ConsoleLogger('app', LogLevel.INFO);
```

If `DEBUG=app`, logger's min level stayed at `INFO`. Now, it display all log !

- [`54e293d`](https://github.com/christophehurpeau/nightingale/commit/54e293da0f159a28e844b6d3aaf1300c8e473c2c) browser localStorage.DEBUG, minLevel is now ignored if the logger`s name is in the debug (Christophe Hurpeau)


### v2.3.0

- [`15e77f3`](https://github.com/christophehurpeau/nightingale/commit/15e77f38c6aede090e9dca2d5ceadeeff322dc20) upgrade dependencies, lint (Christophe Hurpeau)

### v2.2.0

- [`b5f09be`](https://github.com/christophehurpeau/nightingale/commit/b5f09beeaba6007c53501bd69eaf9bfe842528f3) upgrade dependencies, jsdoc, lint, coveralls (Christophe Hurpeau)

### v2.1.2

- [`70ebab9`](https://github.com/christophehurpeau/nightingale/commit/70ebab975c074ea27e082a6e1748ee1e7c75c4da) use alouette only in node (Christophe Hurpeau)

### v2.1.1

- [`c4159ba`](https://github.com/christophehurpeau/nightingale/commit/c4159bace53c3948f024b99fd0985b0934d93361) jspm config (Christophe Hurpeau)

### v2.1.0

- [`267e2b3`](https://github.com/christophehurpeau/nightingale/commit/267e2b3a5b894f12d147f8595f3e4a5ab931310d) use alouette (Christophe Hurpeau)

### v2.0.0

- [`a7d6473`](https://github.com/christophehurpeau/nightingale/commit/a7d6473e9f482066eeb23d3745daf0de3727b19f) browser output and update springbokjs-library (Christophe Hurpeau)

### v1.2.0

- [`84a8f79`](https://github.com/christophehurpeau/nightingale/commit/84a8f79ed312f8e654a36e222bc4d9881fa32d7c) DEBUG=* and DEBUG=app where name = app.something (Christophe Hurpeau)

### v1.1.1

- [`3fe9483`](https://github.com/christophehurpeau/nightingale/commit/3fe9483ce70a4e29a04a1cc43855afa24bd2e4c1) Update README.md (Christophe Hurpeau)
- [`a9828e6`](https://github.com/christophehurpeau/nightingale/commit/a9828e681e2d2e7f3e7a581836c9efa15ed7e637) rename inspect to inspectValue (Christophe Hurpeau)
- [`c079ed7`](https://github.com/christophehurpeau/nightingale/commit/c079ed7273b21dcde4001fdbb008917975e5fb5f) fix when styles is undefined (Christophe Hurpeau)

### v1.1.0

- [`91d87c1`](https://github.com/christophehurpeau/nightingale/commit/91d87c1d13e50fbb5a9ce61885f55dd4d3075d25) update dependencies, use process.env.DEBUG and add doc (Christophe Hurpeau)

### v1.0.1

- [`8f68ef0`](https://github.com/christophehurpeau/nightingale/commit/8f68ef08058b9dcb6413e3884b2576c427bec19f) fix min level in Handler (Christophe Hurpeau)
