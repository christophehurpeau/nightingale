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

