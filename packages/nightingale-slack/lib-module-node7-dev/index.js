import { post } from 'request';
import createBody from './createBody';

import t from 'flow-runtime';
const createHandler = slackConfig => record => {
  const body = createBody(record, slackConfig);

  post({ url: slackConfig.webhookUrl, body, json: true }).on('error', err2 => console.error(err2.stack));
};

const SlackConfigType = t.type('SlackConfigType', t.exactObject(t.property('webhookUrl', t.string()), t.property('channel', t.nullable(t.string())), t.property('username', t.nullable(t.string())), t.property('iconUrl', t.nullable(t.string())), t.property('iconEmoji', t.nullable(t.string()))));


export default function SlackHandler(slackConfig, minLevel) {
  let _minLevelType = t.number();

  t.param('slackConfig', SlackConfigType).assert(slackConfig);
  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}
//# sourceMappingURL=index.js.map