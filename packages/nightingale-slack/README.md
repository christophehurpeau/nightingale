# nightingale-slack [![NPM version][npm-image]][npm-url]

Slack handler for nightingale

[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Dependency Status][daviddm-image]][daviddm-url]

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
