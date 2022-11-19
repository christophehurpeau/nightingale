# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [13.0.0](https://github.com/christophehurpeau/nightingale/compare/v12.1.4...v13.0.0) (2022-11-19)


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

* cjs build ([2e24ac5](https://github.com/christophehurpeau/nightingale/commit/2e24ac5753ee386c5be9ca56796194ee598f10ff))





## [12.1.3](https://github.com/christophehurpeau/nightingale/compare/v12.1.2...v12.1.3) (2022-01-15)

**Note:** Version bump only for package nightingale-sentry





## [12.1.2](https://github.com/christophehurpeau/nightingale/compare/v12.1.1...v12.1.2) (2022-01-02)


### Bug Fixes

* main esm for jest which supports esm but not exports ([98789fa](https://github.com/christophehurpeau/nightingale/commit/98789fa490e723840fccc443584189b6905d871b))





## [12.1.1](https://github.com/christophehurpeau/nightingale/compare/v12.1.0...v12.1.1) (2022-01-01)


### Bug Fixes

* properly configure package type ([2e0cbf5](https://github.com/christophehurpeau/nightingale/commit/2e0cbf555bd3b9fa3c3851025452937f64408aa8))





# [12.1.0](https://github.com/christophehurpeau/nightingale/compare/v12.0.1...v12.1.0) (2021-12-15)

**Note:** Version bump only for package nightingale-sentry





## [12.0.1](https://github.com/christophehurpeau/nightingale/compare/v12.0.0...v12.0.1) (2021-12-12)

**Note:** Version bump only for package nightingale-sentry





# [12.0.0](https://github.com/christophehurpeau/nightingale/compare/v11.9.0...v12.0.0) (2021-12-11)


### Build System

* node 14 and remove dev builds ([432ecd1](https://github.com/christophehurpeau/nightingale/commit/432ecd1faafd0419f57dea00fce560e4cccc207f))


### Features

* export SentryHandler as named export ([dae462e](https://github.com/christophehurpeau/nightingale/commit/dae462e9cd3ac9dd1593b98d46d2a768daf51049))


### BREAKING CHANGES

* requires to import SentryHandler as named import
* requires node 14





## [11.7.4](https://github.com/christophehurpeau/nightingale/compare/v11.7.3...v11.7.4) (2021-11-27)

**Note:** Version bump only for package nightingale-sentry





## [11.7.2](https://github.com/christophehurpeau/nightingale/compare/v11.7.1...v11.7.2) (2021-11-27)

**Note:** Version bump only for package nightingale-sentry





## [11.7.1](https://github.com/christophehurpeau/nightingale/compare/v11.7.0...v11.7.1) (2021-06-29)


### Bug Fixes

* update pob-babel to bring back webpack 4 support ([4887431](https://github.com/christophehurpeau/nightingale/commit/4887431b3b272496511f879af022638723b9056e))





# [11.7.0](https://github.com/christophehurpeau/nightingale/compare/v11.6.0...v11.7.0) (2021-03-29)

**Note:** Version bump only for package nightingale-sentry





# [11.6.0](https://github.com/christophehurpeau/nightingale/compare/v11.5.4...v11.6.0) (2021-03-21)


### Features

* update dependencies and browserlist config ([81d2340](https://github.com/christophehurpeau/nightingale/commit/81d234069412c746ebc99faed778092790f332ca))





## [11.5.4](https://github.com/christophehurpeau/nightingale/compare/v11.5.3...v11.5.4) (2021-02-14)

**Note:** Version bump only for package nightingale-sentry





## [11.5.3](https://github.com/christophehurpeau/nightingale/compare/v11.5.2...v11.5.3) (2021-02-14)


### Bug Fixes

* **nightingale-sentry:** compatibility with sentry-expo ([3ab3262](https://github.com/christophehurpeau/nightingale/commit/3ab3262054bfce3645945d54a2373a19c4455e9e))





## [11.5.2](https://github.com/christophehurpeau/nightingale/compare/v11.5.1...v11.5.2) (2021-02-14)

**Note:** Version bump only for package nightingale-sentry





# [11.5.0](https://github.com/christophehurpeau/nightingale/compare/v11.4.0...v11.5.0) (2021-02-06)


### Features

* better support unhandled errors ([b666145](https://github.com/christophehurpeau/nightingale/commit/b666145eefa5ce090a4134bf0dcb968eb6a2062d))
* **nightingale-sentry:** sentry v6, support browser, add breadcrumbs ([dae9b69](https://github.com/christophehurpeau/nightingale/commit/dae9b6926f7b888c547db287cba92b930d02b12e))





# [11.3.0](https://github.com/christophehurpeau/nightingale/compare/v11.2.0...v11.3.0) (2021-02-06)

**Note:** Version bump only for package nightingale-sentry





# [11.2.0](https://github.com/christophehurpeau/nightingale/compare/v11.1.1...v11.2.0) (2021-02-04)

**Note:** Version bump only for package nightingale-sentry





# [11.1.0](https://github.com/christophehurpeau/nightingale/compare/v11.0.5...v11.1.0) (2021-01-31)

**Note:** Version bump only for package nightingale-sentry





## [11.0.5](https://github.com/christophehurpeau/nightingale/compare/v11.0.4...v11.0.5) (2021-01-18)


### Bug Fixes

* update pob-babel for better support ([44119b7](https://github.com/christophehurpeau/nightingale/commit/44119b72437e0572757a118985c7a205cb9d2e0a))





## [11.0.3](https://github.com/christophehurpeau/nightingale/compare/v11.0.2...v11.0.3) (2021-01-18)

**Note:** Version bump only for package nightingale-sentry





## [11.0.1](https://github.com/christophehurpeau/nightingale/compare/v11.0.0...v11.0.1) (2021-01-18)


### Bug Fixes

* bring back support for webpack 4 ([9134da3](https://github.com/christophehurpeau/nightingale/commit/9134da3b85fb46da826c4f59631942373b51f592))





# [11.0.0](https://github.com/christophehurpeau/nightingale/compare/v10.0.1...v11.0.0) (2020-12-12)


### Bug Fixes

* update devdeps and fix lerna config ([79e97dd](https://github.com/christophehurpeau/nightingale/commit/79e97dd8ad0750a2e5871d9fdeee49de1668bf77))


### Code Refactoring

* use yarn 2, requires node 12 ([73a85dd](https://github.com/christophehurpeau/nightingale/commit/73a85ddc37dbfe53b80fd6feea6cbd31874ea771))


### BREAKING CHANGES

* drop support for node 10





## [10.0.1](https://github.com/christophehurpeau/nightingale/compare/v10.0.0...v10.0.1) (2020-05-23)

**Note:** Version bump only for package nightingale-sentry





# 10.0.0 (2020-05-23)


### Bug Fixes

* fix ([dc7fdb4](https://github.com/christophehurpeau/nightingale/commit/dc7fdb4))
* update dependencies and deprecate Record for LogRecord ([2d0a758](https://github.com/christophehurpeau/nightingale/commit/2d0a758))


### Code Refactoring

* use typescript ([2e465c6](https://github.com/christophehurpeau/nightingale/commit/2e465c6))


### Features

* add user and tags ([84c351e](https://github.com/christophehurpeau/nightingale/commit/84c351e))
* drop node 6 ([e09773c](https://github.com/christophehurpeau/nightingale/commit/e09773c))
* lerna, rollup ([08f73b6](https://github.com/christophehurpeau/nightingale/commit/08f73b6))
* pob update ([8eb74d9](https://github.com/christophehurpeau/nightingale/commit/8eb74d9))
* pob upgrade ([5b4f01f](https://github.com/christophehurpeau/nightingale/commit/5b4f01f))
* update dependencies ([08e82b5](https://github.com/christophehurpeau/nightingale/commit/08e82b5))
* update dependencies ([e2e8ef5](https://github.com/christophehurpeau/nightingale/commit/e2e8ef5))
* update dependencies ([a185796](https://github.com/christophehurpeau/nightingale/commit/a185796))
* update nightingale-sentry to use @sentry/node ([53b5b22](https://github.com/christophehurpeau/nightingale/commit/53b5b22))


### BREAKING CHANGES

* requires node 10
* node 6 no longer supported
* node 4 is no longer supported
* remove deprecated dot support





## [5.2.2](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@5.2.1...nightingale-sentry@5.2.2) (2019-05-01)

**Note:** Version bump only for package nightingale-sentry





## [5.2.1](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@5.2.0...nightingale-sentry@5.2.1) (2019-04-05)

**Note:** Version bump only for package nightingale-sentry





# [5.2.0](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@5.1.0...nightingale-sentry@5.2.0) (2019-04-05)


### Features

* update dependencies ([e2e8ef5](https://github.com/christophehurpeau/nightingale/commit/e2e8ef5))





# [5.1.0](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@5.0.1...nightingale-sentry@5.1.0) (2019-02-24)


### Bug Fixes

* update dependencies and deprecate Record for LogRecord ([2d0a758](https://github.com/christophehurpeau/nightingale/commit/2d0a758))


### Features

* update dependencies ([a185796](https://github.com/christophehurpeau/nightingale/commit/a185796))
* update nightingale-sentry to use @sentry/node ([53b5b22](https://github.com/christophehurpeau/nightingale/commit/53b5b22))





## [5.0.1](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@5.0.0...nightingale-sentry@5.0.1) (2018-12-03)

**Note:** Version bump only for package nightingale-sentry





# [5.0.0](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@4.0.4...nightingale-sentry@5.0.0) (2018-12-03)


### Features

* drop node 6 ([e09773c](https://github.com/christophehurpeau/nightingale/commit/e09773c))


### BREAKING CHANGES

* node 6 no longer supported





<a name="4.0.4"></a>
## [4.0.4](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@4.0.3...nightingale-sentry@4.0.4) (2018-06-17)

**Note:** Version bump only for package nightingale-sentry





<a name="4.0.3"></a>
## [4.0.3](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@4.0.2...nightingale-sentry@4.0.3) (2018-05-26)

**Note:** Version bump only for package nightingale-sentry





<a name="4.0.2"></a>
## [4.0.2](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@4.0.1...nightingale-sentry@4.0.2) (2018-05-26)

**Note:** Version bump only for package nightingale-sentry





<a name="4.0.1"></a>
## [4.0.1](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@4.0.0...nightingale-sentry@4.0.1) (2018-05-10)

**Note:** Version bump only for package nightingale-sentry





<a name="4.0.0"></a>
# [4.0.0](https://github.com/christophehurpeau/nightingale/compare/nightingale-sentry@3.0.0...nightingale-sentry@4.0.0) (2018-04-21)


### Code Refactoring

* use typescript ([2e465c6](https://github.com/christophehurpeau/nightingale/commit/2e465c6))


### BREAKING CHANGES

* node 4 is no longer supported





<a name="3.0.0"></a>
# 3.0.0 (2018-03-18)


### Bug Fixes

* fix ([dc7fdb4](https://github.com/christophehurpeau/nightingale/commit/dc7fdb4))


### Features

* add user and tags ([84c351e](https://github.com/christophehurpeau/nightingale/commit/84c351e))
* lerna, rollup ([08f73b6](https://github.com/christophehurpeau/nightingale/commit/08f73b6))
* pob upgrade ([5b4f01f](https://github.com/christophehurpeau/nightingale/commit/5b4f01f))


### BREAKING CHANGES

* remove deprecated dot support




<a name="2.3.0"></a>
# [2.3.0](https://github.com/nightingalejs/nightingale-sentry/compare/v2.2.0...v2.3.0) (2018-02-01)


<a name="2.2.0"></a>
# [2.2.0](https://github.com/nightingalejs/nightingale-sentry/compare/v2.1.0...v2.2.0) (2017-02-28)


### Features

* pob upgrade ([2ec8cd0](https://github.com/nightingalejs/nightingale-sentry/commit/2ec8cd0))


### v2.1.0

- [`73f7d73`](https://github.com/nightingalejs/nightingale-sentry/commit/73f7d7316d4b15b5e8f6b7c3caa37e4f0d38424e) Update README.md (Christophe Hurpeau)
- [`6f1604e`](https://github.com/nightingalejs/nightingale-sentry/commit/6f1604e38a2083109a786b2e9b51d938a5ae70a1) feat: add user and tags (Christophe Hurpeau)
- [`8282ab1`](https://github.com/nightingalejs/nightingale-sentry/commit/8282ab15e80b945497084838d5ab2624b701d132) chore(package): v2.1.0-beta.1 (Christophe Hurpeau)
- [`df97c3a`](https://github.com/nightingalejs/nightingale-sentry/commit/df97c3a11de8f1ea2131d258603a63669b132cb7) refactor: pob update (Christophe Hurpeau)
- [`f44eb05`](https://github.com/nightingalejs/nightingale-sentry/commit/f44eb057f64368c1d88e965c792f1b416f299929) chore(authors): update AUTHORS (Christophe Hurpeau)

### v2.1.0-beta.1

- [`0b7eea0`](https://github.com/nightingalejs/nightingale-sentry/commit/0b7eea01bcd2e4bc4b27fcc60bc83eb0fd018053) feat: add user and tags (Christophe Hurpeau)

### v2.0.1

- [`0b2eec9`](https://github.com/nightingalejs/nightingale-sentry/commit/0b2eec959fdae9e48df49e6dff814e4ca5976aca) fix: fix (Christophe Hurpeau)

### v2.0.0

- [`51951c9`](https://github.com/nightingalejs/nightingale-sentry/commit/51951c98b59397d8c84e4e10c603e7a0bd0b9639) refactor: nightingale v2 (Christophe Hurpeau)

### v1.0.1
