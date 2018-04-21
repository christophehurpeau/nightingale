<h3 align="center">
  nightingale-slack
</h3>

<p align="center">
  Slack handler for nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-slack"><img src="https://img.shields.io/npm/v/nightingale-slack.svg?style=flat-square"></a>
  <a href="https://circleci.com/gh/christophehurpeau/nightingale"><img src="https://img.shields.io/circleci/project/christophehurpeau/nightingale/master.svg?style=flat-square"></a>
  <a href="https://david-dm.org/christophehurpeau/nightingale?path=packages/nightingale-slack"><img src="https://david-dm.org/christophehurpeau/nightingale?path=packages/nightingale-slack.svg?style=flat-square"></a>
  <a href="https://codecov.io/gh/christophehurpeau/nightingale"><img src="https://img.shields.io/codecov/c/github/christophehurpeau/nightingale/master.svg?style=flat-square"></a>
</p>

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
  { handlers: [new SlackHandler(slackErrorConfig, Levels.ERROR)]
])
```
