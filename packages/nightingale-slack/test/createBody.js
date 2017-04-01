/* eslint-disable camelcase */
import { strictEqual, deepStrictEqual } from 'assert';
import levels from 'nightingale-levels';
import createBody from '../src/createBody';

suite('createBody', () => {
  test('keep channel', () => {
    const testChannel = 'testChannel';
    strictEqual(createBody({}, { channel: testChannel }).channel, testChannel);
  });

  test('keep username', () => {
    const testUsername = 'testUsername';
    strictEqual(createBody({}, { username: testUsername }).username, testUsername);
  });

  test('keep iconUrl', () => {
    const testIconUrl = 'testIconUrl';
    strictEqual(createBody({}, { iconUrl: testIconUrl }).icon_url, testIconUrl);
  });

  test('keep iconEmoji', () => {
    const testIconEmoji = 'testIconEmoji';
    strictEqual(createBody({}, { iconEmoji: testIconEmoji }).icon_emoji, testIconEmoji);
  });

  test('attachments has both raw and markdown', () => {
    const record = { level: levels.INFO, message: 'hello', metadata: { meta1: true } };
    deepStrictEqual(createBody(record, {}).attachments, [
      {
        color: '#808080',
        fallback: '→ hello { meta1: true }',
        mrkdwn_in: ['text'],
        text: '→ hello { *meta1:* true }',
        title: 'hello',
      },
    ]);
  });
});
