# nightingale-slack [![NPM version][npm-image]][npm-url]

Slack handler for nightingale

[![Build Status][circleci-status-image]][circleci-status-url]
[![Travis Status][travisci-status-image]][travisci-status-url]
[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coverage-image]][coverage-url]

## Install

```sh
npm install --save nightingale nightingale-slack
```

## Usage

```js
import { configure } from 'nightingale';
import SlackHandler from 'nightingale-slack';

const slackErrorConfig = {
  webhookUrl: string,
  channel: ?string,
  username: ?string,
  iconUrl: ?string,
  iconEmoji: ?string,
};

configure([
  { handlers: [new SlackHandler(slackErrorConfig, levels.ERROR)]
])
```

[npm-image]: https://img.shields.io/npm/v/nightingale-slack.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nightingale-slack
[daviddm-image]: https://david-dm.org/nightingalejs/nightingale-slack.svg?style=flat-square
[daviddm-url]: https://david-dm.org/nightingalejs/nightingale-slack
[dependencyci-image]: https://dependencyci.com/github/nightingalejs/nightingale-slack/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/nightingalejs/nightingale-slack
[circleci-status-image]: https://img.shields.io/circleci/project/nightingalejs/nightingale-slack/master.svg?style=flat-square
[circleci-status-url]: https://circleci.com/gh/nightingalejs/nightingale-slack
[travisci-status-image]: https://img.shields.io/travis/nightingalejs/nightingale-slack/master.svg?style=flat-square
[travisci-status-url]: https://travis-ci.org/nightingalejs/nightingale-slack
[coverage-image]: https://img.shields.io/codecov/c/github/nightingalejs/nightingale-slack/master.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/nightingalejs/nightingale-slack
[docs-coverage-url]: https://nightingalejs.github.io/nightingale-slack/coverage/lcov-report/
