/* eslint-disable camelcase */
import levels from 'nightingale-levels';
import createBody from './createBody';

test('keep channel', () => {
  const testChannel = 'testChannel';
  expect(createBody({}, { channel: testChannel }).channel).toBe(testChannel);
});

test('keep username', () => {
  const testUsername = 'testUsername';
  expect(createBody({}, { username: testUsername }).username).toBe(testUsername);
});

test('keep iconUrl', () => {
  const testIconUrl = 'testIconUrl';
  expect(createBody({}, { iconUrl: testIconUrl }).icon_url).toBe(testIconUrl);
});

test('keep iconEmoji', () => {
  const testIconEmoji = 'testIconEmoji';
  expect(createBody({}, { iconEmoji: testIconEmoji }).icon_emoji).toBe(testIconEmoji);
});

test('attachments has both raw and markdown', () => {
  const record = { level: levels.INFO, message: 'hello', metadata: { meta1: true } };
  expect(createBody(record, {}).attachments).toBe([
    {
      color: '#808080',
      fallback: '→ hello { meta1: true }',
      mrkdwn_in: ['text'],
      text: '→ hello { *meta1:* true }',
      title: 'hello',
    },
  ]);
});
