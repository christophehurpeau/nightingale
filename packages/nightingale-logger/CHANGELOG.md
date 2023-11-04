# Changelog

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [14.2.0](https://github.com/christophehurpeau/nightingale/compare/v14.1.0...v14.2.0) (2023-11-04)

Note: no notable changes

Version bump for dependency: nightingale-levels
Version bump for dependency: nightingale-types


## [14.1.0](https://github.com/christophehurpeau/nightingale/compare/v14.0.2...v14.1.0) (2023-07-27)

**Note:** Version bump only for package nightingale-logger





## [14.0.2](https://github.com/christophehurpeau/nightingale/compare/v14.0.1...v14.0.2) (2023-06-30)


### Bug Fixes

* typo types for typescript exports ([1eb20e4](https://github.com/christophehurpeau/nightingale/commit/1eb20e47ea18a3d015146da4efe58c32df066e97))



## [14.0.1](https://github.com/christophehurpeau/nightingale/compare/v14.0.0...v14.0.1) (2023-06-30)


### Bug Fixes

* add missing type in exports for latest typescript ([8897fd6](https://github.com/christophehurpeau/nightingale/commit/8897fd6fcbd25975482fd1549277b73ed725e53c))



## [14.0.0](https://github.com/christophehurpeau/nightingale/compare/v13.0.0...v14.0.0) (2023-06-30)


### ⚠ BREAKING CHANGES

* **deps:** require node 18 
* requires node 18

### Features

* requires node 18 ([4452b11](https://github.com/christophehurpeau/nightingale/commit/4452b116188e58c293be85e462e04922f7ad51f0))


### Miscellaneous Chores

* **deps:** update dependency @pob/root to v8 ([#760](https://github.com/christophehurpeau/nightingale/issues/760)) ([22dc3cc](https://github.com/christophehurpeau/nightingale/commit/22dc3cceabdfd465d04ee36fec8fdac31febab69))



# [13.0.0](https://github.com/christophehurpeau/nightingale/compare/v12.1.4...v13.0.0) (2022-11-19)


### Bug Fixes

* fix node global declaration ([ab5100b](https://github.com/christophehurpeau/nightingale/commit/ab5100b9d63718b18c4f97c9a8d73907be325fe8))
* **nightingale-logger:** add explicit error message when trying to extends undefined context ([1346bd5](https://github.com/christophehurpeau/nightingale/commit/1346bd5a70ca3df9e87c5a84154bd4b6d58217b4))


### Code Refactoring

* drop node 14 and cjs ([9a8ca06](https://github.com/christophehurpeau/nightingale/commit/9a8ca064449ddc0d69e26543e21c2d522536c50a))


### Features

* build for node 16 ([30ae3e9](https://github.com/christophehurpeau/nightingale/commit/30ae3e9c455dbad793c2f704b9d860069dc80c32))
* **nightingale-sentry:** update to v7 ([0188b65](https://github.com/christophehurpeau/nightingale/commit/0188b65014dcc4a492d9b868e86fb08ee0954b87))


### BREAKING CHANGES

* dropped node 14 and cjs
* **nightingale-sentry:** remove deprecated token passed in constructor. Use Sentry object instead and init in the app.
* drop node 14





## [12.1.4](https://github.com/christophehurpeau/nightingale/compare/v12.1.3...v12.1.4) (2022-02-05)


### Bug Fixes

* better browser support when global is not defined ([194c252](https://github.com/christophehurpeau/nightingale/commit/194c25226d5aa8e7eda7cbdb899c921341f82d71))
* cjs build ([2e24ac5](https://github.com/christophehurpeau/nightingale/commit/2e24ac5753ee386c5be9ca56796194ee598f10ff))





## [12.1.3](https://github.com/christophehurpeau/nightingale/compare/v12.1.2...v12.1.3) (2022-01-15)

**Note:** Version bump only for package nightingale-logger





## [12.1.2](https://github.com/christophehurpeau/nightingale/compare/v12.1.1...v12.1.2) (2022-01-02)


### Bug Fixes

* main esm for jest which supports esm but not exports ([98789fa](https://github.com/christophehurpeau/nightingale/commit/98789fa490e723840fccc443584189b6905d871b))





## [12.1.1](https://github.com/christophehurpeau/nightingale/compare/v12.1.0...v12.1.1) (2022-01-01)


### Bug Fixes

* properly configure package type ([2e0cbf5](https://github.com/christophehurpeau/nightingale/commit/2e0cbf555bd3b9fa3c3851025452937f64408aa8))





# [12.1.0](https://github.com/christophehurpeau/nightingale/compare/v12.0.1...v12.1.0) (2021-12-15)

**Note:** Version bump only for package nightingale-logger





## [12.0.1](https://github.com/christophehurpeau/nightingale/compare/v12.0.0...v12.0.1) (2021-12-12)

**Note:** Version bump only for package nightingale-logger





# [12.0.0](https://github.com/christophehurpeau/nightingale/compare/v11.9.0...v12.0.0) (2021-12-11)


### Build System

* node 14 and remove dev builds ([432ecd1](https://github.com/christophehurpeau/nightingale/commit/432ecd1faafd0419f57dea00fce560e4cccc207f))


### Features

* drop default exports ([8878e49](https://github.com/christophehurpeau/nightingale/commit/8878e492b94852fcb892fd6d12c02c15c31b38b9))


### BREAKING CHANGES

* use named imports instead of default exports
* requires node 14





# [11.9.0](https://github.com/christophehurpeau/nightingale/compare/v11.8.1...v11.9.0) (2021-11-28)

**Note:** Version bump only for package nightingale-logger





## [11.8.1](https://github.com/christophehurpeau/nightingale/compare/v11.8.0...v11.8.1) (2021-11-28)


### Bug Fixes

* **nightingale-logger:** fix build ([fe7e3c9](https://github.com/christophehurpeau/nightingale/commit/fe7e3c9ef54a6c6957b244112af5f5438ed1950b))





# [11.8.0](https://github.com/christophehurpeau/nightingale/compare/v11.7.4...v11.8.0) (2021-11-27)


### Features

* **nightingale-logger:** support passing Error to any of the basic methods ([c1fda3e](https://github.com/christophehurpeau/nightingale/commit/c1fda3e5686f4c86f96d2cb2581239d2394bcf39))





## [11.7.4](https://github.com/christophehurpeau/nightingale/compare/v11.7.3...v11.7.4) (2021-11-27)


### Bug Fixes

* build all packages ([dbb4785](https://github.com/christophehurpeau/nightingale/commit/dbb4785cbb8c75942935c4a5935df32fd2e93690))





## [11.7.2](https://github.com/christophehurpeau/nightingale/compare/v11.7.1...v11.7.2) (2021-11-27)

**Note:** Version bump only for package nightingale-logger





## [11.7.1](https://github.com/christophehurpeau/nightingale/compare/v11.7.0...v11.7.1) (2021-06-29)


### Bug Fixes

* update pob-babel to bring back webpack 4 support ([4887431](https://github.com/christophehurpeau/nightingale/commit/4887431b3b272496511f879af022638723b9056e))





# [11.7.0](https://github.com/christophehurpeau/nightingale/compare/v11.6.0...v11.7.0) (2021-03-29)

**Note:** Version bump only for package nightingale-logger





# [11.6.0](https://github.com/christophehurpeau/nightingale/compare/v11.5.4...v11.6.0) (2021-03-21)


### Features

* update dependencies and browserlist config ([81d2340](https://github.com/christophehurpeau/nightingale/commit/81d234069412c746ebc99faed778092790f332ca))





## [11.5.2](https://github.com/christophehurpeau/nightingale/compare/v11.5.1...v11.5.2) (2021-02-14)

**Note:** Version bump only for package nightingale-logger





# [11.3.0](https://github.com/christophehurpeau/nightingale/compare/v11.2.0...v11.3.0) (2021-02-06)

**Note:** Version bump only for package nightingale-logger





# [11.2.0](https://github.com/christophehurpeau/nightingale/compare/v11.1.1...v11.2.0) (2021-02-04)


### Bug Fixes

* missing "browser" in package.json ([cce81cb](https://github.com/christophehurpeau/nightingale/commit/cce81cb3f8f52f18049f0a2f49944920ee027fad))


### Features

* prefer named exports and deprecate some default exports ([4697828](https://github.com/christophehurpeau/nightingale/commit/4697828a3a22b95a978e90001046337f8efd7d0c))





# [11.1.0](https://github.com/christophehurpeau/nightingale/compare/v11.0.5...v11.1.0) (2021-01-31)

**Note:** Version bump only for package nightingale-logger





## [11.0.5](https://github.com/christophehurpeau/nightingale/compare/v11.0.4...v11.0.5) (2021-01-18)


### Bug Fixes

* update pob-babel for better support ([44119b7](https://github.com/christophehurpeau/nightingale/commit/44119b72437e0572757a118985c7a205cb9d2e0a))





## [11.0.3](https://github.com/christophehurpeau/nightingale/compare/v11.0.2...v11.0.3) (2021-01-18)


### Bug Fixes

* import browser path ([d4469d4](https://github.com/christophehurpeau/nightingale/commit/d4469d400db56a8dc22838ae6308fdd607375566))





## [11.0.1](https://github.com/christophehurpeau/nightingale/compare/v11.0.0...v11.0.1) (2021-01-18)


### Bug Fixes

* bring back support for webpack 4 ([9134da3](https://github.com/christophehurpeau/nightingale/commit/9134da3b85fb46da826c4f59631942373b51f592))





# [11.0.0](https://github.com/christophehurpeau/nightingale/compare/v10.0.1...v11.0.0) (2020-12-12)


### Bug Fixes

* add missing def files ([a6c0b82](https://github.com/christophehurpeau/nightingale/commit/a6c0b82277c4f9e31f983b6fd9a307535200fcbd))
* update devdeps and fix lerna config ([79e97dd](https://github.com/christophehurpeau/nightingale/commit/79e97dd8ad0750a2e5871d9fdeee49de1668bf77))


### Code Refactoring

* use yarn 2, requires node 12 ([73a85dd](https://github.com/christophehurpeau/nightingale/commit/73a85ddc37dbfe53b80fd6feea6cbd31874ea771))


### BREAKING CHANGES

* drop support for node 10





## [10.0.1](https://github.com/christophehurpeau/nightingale/compare/v10.0.0...v10.0.1) (2020-05-23)

**Note:** Version bump only for package nightingale-logger





# 10.0.0 (2020-05-23)


### Bug Fixes

* getConfigForLoggerRecord key can be undefined ([260658b](https://github.com/christophehurpeau/nightingale/commit/260658b))
* key replace all dot not just the first one ([00d4a50](https://github.com/christophehurpeau/nightingale/commit/00d4a50))
* logger key warning ([a8097d7](https://github.com/christophehurpeau/nightingale/commit/a8097d7))
* metadata for enter function ([a6529b2](https://github.com/christophehurpeau/nightingale/commit/a6529b2))
* metadata is optional (flow) ([cd07211](https://github.com/christophehurpeau/nightingale/commit/cd07211))
* nightingale-logger condition init getconfig ([031941c](https://github.com/christophehurpeau/nightingale/commit/031941c))
* update dependencies and deprecate Record for LogRecord ([2d0a758](https://github.com/christophehurpeau/nightingale/commit/2d0a758))
* warn without key ([c9118b3](https://github.com/christophehurpeau/nightingale/commit/c9118b3))


### Code Refactoring

* use typescript ([2e465c6](https://github.com/christophehurpeau/nightingale/commit/2e465c6))


### Features

* drop node 6 ([e09773c](https://github.com/christophehurpeau/nightingale/commit/e09773c))
* improve not dot error message ([16710a6](https://github.com/christophehurpeau/nightingale/commit/16710a6))
* lerna, rollup ([08f73b6](https://github.com/christophehurpeau/nightingale/commit/08f73b6))
* pob update ([8eb74d9](https://github.com/christophehurpeau/nightingale/commit/8eb74d9))
* pob upgrade ([df0f6d8](https://github.com/christophehurpeau/nightingale/commit/df0f6d8))
* pob upgrade ([bce2e16](https://github.com/christophehurpeau/nightingale/commit/bce2e16))
* update dependencies ([08e82b5](https://github.com/christophehurpeau/nightingale/commit/08e82b5))
* update dependencies ([e2e8ef5](https://github.com/christophehurpeau/nightingale/commit/e2e8ef5))
* update dependencies ([a185796](https://github.com/christophehurpeau/nightingale/commit/a185796))
* **logger:** add a method to get the context of the logger ([0846714](https://github.com/christophehurpeau/nightingale/commit/0846714))
* update dependencies ([76b5391](https://github.com/christophehurpeau/nightingale/commit/76b5391))
* warn dot in key add key and diplayname ([7a5967c](https://github.com/christophehurpeau/nightingale/commit/7a5967c))


### BREAKING CHANGES

* requires node 10
* node 6 no longer supported
* node 4 is no longer supported
* remove deprecated dot support





## [6.2.2](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@6.2.1...nightingale-logger@6.2.2) (2019-05-01)

**Note:** Version bump only for package nightingale-logger





## [6.2.1](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@6.2.0...nightingale-logger@6.2.1) (2019-04-05)

**Note:** Version bump only for package nightingale-logger





# [6.2.0](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@6.1.0...nightingale-logger@6.2.0) (2019-04-05)


### Bug Fixes

* metadata for enter function ([a6529b2](https://github.com/christophehurpeau/nightingale/commit/a6529b2))


### Features

* update dependencies ([e2e8ef5](https://github.com/christophehurpeau/nightingale/commit/e2e8ef5))





# [6.1.0](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@6.0.0...nightingale-logger@6.1.0) (2019-02-24)


### Bug Fixes

* update dependencies and deprecate Record for LogRecord ([2d0a758](https://github.com/christophehurpeau/nightingale/commit/2d0a758))


### Features

* update dependencies ([a185796](https://github.com/christophehurpeau/nightingale/commit/a185796))





# [6.0.0](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@5.1.0...nightingale-logger@6.0.0) (2018-12-03)


### Features

* drop node 6 ([e09773c](https://github.com/christophehurpeau/nightingale/commit/e09773c))


### BREAKING CHANGES

* node 6 no longer supported





<a name="5.1.0"></a>
# [5.1.0](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@5.0.6...nightingale-logger@5.1.0) (2018-06-28)


### Features

* **logger:** add a method to get the context of the logger ([0846714](https://github.com/christophehurpeau/nightingale/commit/0846714))





<a name="5.0.6"></a>
## [5.0.6](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@5.0.5...nightingale-logger@5.0.6) (2018-06-17)

**Note:** Version bump only for package nightingale-logger





<a name="5.0.5"></a>
## [5.0.5](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@5.0.4...nightingale-logger@5.0.5) (2018-05-27)

**Note:** Version bump only for package nightingale-logger





<a name="5.0.4"></a>
## [5.0.4](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@5.0.3...nightingale-logger@5.0.4) (2018-05-26)

**Note:** Version bump only for package nightingale-logger





<a name="5.0.3"></a>
## [5.0.3](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@5.0.2...nightingale-logger@5.0.3) (2018-05-26)

**Note:** Version bump only for package nightingale-logger





<a name="5.0.2"></a>
## [5.0.2](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@5.0.1...nightingale-logger@5.0.2) (2018-05-10)

**Note:** Version bump only for package nightingale-logger





<a name="5.0.1"></a>
## [5.0.1](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@5.0.0...nightingale-logger@5.0.1) (2018-04-22)


### Bug Fixes

* nightingale-logger condition init getconfig ([031941c](https://github.com/christophehurpeau/nightingale/commit/031941c))





<a name="5.0.0"></a>
# [5.0.0](https://github.com/christophehurpeau/nightingale/compare/nightingale-logger@4.0.0...nightingale-logger@5.0.0) (2018-04-21)


### Code Refactoring

* use typescript ([2e465c6](https://github.com/christophehurpeau/nightingale/commit/2e465c6))


### BREAKING CHANGES

* node 4 is no longer supported





<a name="4.0.0"></a>
# 4.0.0 (2018-03-18)


### Bug Fixes

* getConfigForLoggerRecord key can be undefined ([260658b](https://github.com/christophehurpeau/nightingale/commit/260658b))
* key replace all dot not just the first one ([00d4a50](https://github.com/christophehurpeau/nightingale/commit/00d4a50))
* logger key warning ([a8097d7](https://github.com/christophehurpeau/nightingale/commit/a8097d7))
* metadata is optional (flow) ([cd07211](https://github.com/christophehurpeau/nightingale/commit/cd07211))
* warn without key ([c9118b3](https://github.com/christophehurpeau/nightingale/commit/c9118b3))


### Features

* lerna, rollup ([08f73b6](https://github.com/christophehurpeau/nightingale/commit/08f73b6))
* pob upgrade ([df0f6d8](https://github.com/christophehurpeau/nightingale/commit/df0f6d8))
* pob upgrade ([bce2e16](https://github.com/christophehurpeau/nightingale/commit/bce2e16))
* update dependencies ([76b5391](https://github.com/christophehurpeau/nightingale/commit/76b5391))
* warn dot in key add key and diplayname ([7a5967c](https://github.com/christophehurpeau/nightingale/commit/7a5967c))


### BREAKING CHANGES

* remove deprecated dot support




<a name="3.4.0"></a>
# [3.4.0](https://github.com/nightingalejs/nightingale-logger/compare/v3.3.0...v3.4.0) (2017-04-01)


<a name="3.3.0"></a>
# [3.3.0](https://github.com/nightingalejs/nightingale-logger/compare/v3.2.0...v3.3.0) (2017-03-06)


### Features

* pob upgrade ([e3b1ab9](https://github.com/nightingalejs/nightingale-logger/commit/e3b1ab9))


<a name="3.2.0"></a>
# [3.2.0](https://github.com/nightingalejs/nightingale-logger/compare/v3.1.1...v3.2.0) (2017-02-28)


### Features

* pob upgrade ([1227649](https://github.com/nightingalejs/nightingale-logger/commit/1227649))


### v3.1.1

- [`55be859`](https://github.com/nightingalejs/nightingale-logger/commit/55be859755496de5189ec69043e6b562b92a1a14) update dependencies (Christophe Hurpeau)
- [`c97f1e1`](https://github.com/nightingalejs/nightingale-logger/commit/c97f1e171782a47dffe874c0cf7a9767e3c076f9) fix: logger key warning (Christophe Hurpeau)
- [`2582acc`](https://github.com/nightingalejs/nightingale-logger/commit/2582acc6e7d2eeb969f90affb3d548df509b495a) chore(package): update dependencies (Christophe Hurpeau)

### v3.1.0

- [`3641ac2`](https://github.com/nightingalejs/nightingale-logger/commit/3641ac22976d215c75547a8a8b7c2a2fd0bfbdbe) refactor: update dependencies, add notice and critical (Christophe Hurpeau)

### v3.0.1

- [`e0b047d`](https://github.com/nightingalejs/nightingale-logger/commit/e0b047d8e8919dd6ac846d6718af1cdc01e44d1c) fix: getConfigForLoggerRecord key can be undefined (Christophe Hurpeau)

### v3.0.0



### v3.0.0-rc.2

- [`f3e52ab`](https://github.com/nightingalejs/nightingale-logger/commit/f3e52abc581332eb313852610e2d070a2fe2fc94) fix: metadata is optional (flow) (Christophe Hurpeau)

### v3.0.0-rc.1

- [`39bfe4c`](https://github.com/nightingalejs/nightingale-logger/commit/39bfe4cecaf9902e4cf994d441d353998a1077ee) refactor: flow (Christophe Hurpeau)

### v3.0.0-beta.5

- [`976199b`](https://github.com/nightingalejs/nightingale-logger/commit/976199b78247babc5557eb5930afe8718675e2b1) fix: key replace all dot not just the first one (Christophe Hurpeau)

### v3.0.0-beta.4

- [`b3481cb`](https://github.com/nightingalejs/nightingale-logger/commit/b3481cb337efbfb128f68a54d46e037ddd2bf286) refactor: breaking: logger doesn't returns itself now (Christophe Hurpeau)

### v3.0.0-beta.3

- [`5def4da`](https://github.com/nightingalejs/nightingale-logger/commit/5def4da48901c2947f89e8a579f5d518683f2aa5) feat: warn dot in key add key and diplayname (Christophe Hurpeau)

### v3.0.0-beta.2

- [`162bb6a`](https://github.com/nightingalejs/nightingale-logger/commit/162bb6a5c2ac71d9796d9445aa9322e618f839ec) fix: warn without key (Christophe Hurpeau)

### v3.0.0-beta.1

- [`e89d21b`](https://github.com/nightingalejs/nightingale-logger/commit/e89d21b95272b62daebcc2e69d8adee3fd29fc8c) refactor: update pob (Christophe Hurpeau)
- [`7bfadc9`](https://github.com/nightingalejs/nightingale-logger/commit/7bfadc9e900684afd5d7dc5cd752899a1fa67036) feat: update dependencies (Christophe Hurpeau)
- [`8e6bf88`](https://github.com/nightingalejs/nightingale-logger/commit/8e6bf8854c642ed2862e2a4da73daf8c903f82d0) refactor: remove nightingale-debug, use : for child (Christophe Hurpeau)

### v1.6.0

- [`73701de`](https://github.com/nightingalejs/nightingale-logger/commit/73701def89a457b6eb8bc91e8f799d2a8a1a34bf) nighingale v2 compatibility for nightingale-logger v1 (Christophe Hurpeau)

### v1.5.0

- [`e54efb4`](https://github.com/nightingalejs/nightingale-logger/commit/e54efb42e9eeda7133d4c0cc8b5a4e89cd77704d) jsdoc (Christophe Hurpeau)
- [`5086743`](https://github.com/nightingalejs/nightingale-logger/commit/5086743eee4f10e5a41e4260b8dd1bb4fa4fb3cd) babel-plugin-add-jsdoc-annotations@5.1 (Christophe Hurpeau)
- [`a9d6ae0`](https://github.com/nightingalejs/nightingale-logger/commit/a9d6ae0e612cc6e67e191d4ba7c035e2463aa795) build (Christophe Hurpeau)
- [`a0d73fe`](https://github.com/nightingalejs/nightingale-logger/commit/a0d73fe789c342b0adf184f7ec22d14b177c9429) update dependencies (Christophe Hurpeau)

### v1.4.0

- [`309e2ac`](https://github.com/nightingalejs/nightingale-logger/commit/309e2ac5b565ffbd43123cb552152e687dc9b42b) fix circleci (Christophe Hurpeau)
- [`9bde812`](https://github.com/nightingalejs/nightingale-logger/commit/9bde812e5c3e24aeaa100b0d420f7dce0ce1c493) update dependencies (Christophe Hurpeau)

### v1.3.0

- [`7b917b7`](https://github.com/nightingalejs/nightingale-logger/commit/7b917b71461288e316b428d278179e7df7b03b4c) extendsContext (Christophe Hurpeau)
- [`34e9ca3`](https://github.com/nightingalejs/nightingale-logger/commit/34e9ca39730ff0f14579b988c63377159e819954) pob upgrade (Christophe Hurpeau)


### v1.2.0

- [`97958a2`](https://github.com/nightingalejs/nightingale-logger/commit/97958a20859de7afc2611c4c3195be81ee9e4d8c) pob, infoTimeEnd, infoSuccessTimeEnd, infoTime, add console.log on error when no loggers (Christophe Hurpeau)

### v1.1.1

- [`67c1594`](https://github.com/nightingalejs/nightingale-logger/commit/67c1594cb1a1283ce03726e34da1dff48def4a97) .doclets.yml (Christophe Hurpeau)
- [`b7c7e45`](https://github.com/nightingalejs/nightingale-logger/commit/b7c7e45dd690aecf8fb7a3fd0212c74aef4599ff) pass this.key in isHandling (DEBUG), context and child (Christophe Hurpeau)

### v1.1.0

use metadata:
for `timeEnd` { timeMs, readableTime }
for `enter` and `exit` { functionName }
