import { post } from 'request';
import createBody from './createBody';

const createHandler = slackConfig => record => {
  const body = createBody(record, slackConfig);

  post({ url: slackConfig.webhookUrl, body, json: true }).on('error', err2 => console.error(err2.stack));
};

export default function SlackHandler(slackConfig, minLevel) {
  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}
//# sourceMappingURL=index.js.map