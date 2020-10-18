/* eslint-disable camelcase */
import Level from 'nightingale-levels';
import createBody from './createBody';

const webhookUrl = 'webhookUrl';
const record = {
  key: 'key',
  datetime: new Date(2010, 1, 1, 1, 1, 1),
  level: Level.INFO,
  message: 'hello',
  metadata: { meta1: true },
};

test('keep channel', () => {
  const testChannel = 'testChannel';
  expect(createBody(record, { webhookUrl, channel: testChannel }).channel).toBe(
    testChannel,
  );
});

test('keep username', () => {
  const testUsername = 'testUsername';
  expect(
    createBody(record, { webhookUrl, username: testUsername }).username,
  ).toBe(testUsername);
});

test('keep iconUrl', () => {
  const testIconUrl = 'testIconUrl';
  expect(
    createBody(record, { webhookUrl, iconUrl: testIconUrl }).icon_url,
  ).toBe(testIconUrl);
});

test('keep iconEmoji', () => {
  const testIconEmoji = 'testIconEmoji';
  expect(
    createBody(record, { webhookUrl, iconEmoji: testIconEmoji }).icon_emoji,
  ).toBe(testIconEmoji);
});

test('attachments has both raw and markdown', () => {
  expect(createBody(record, { webhookUrl }).attachments).toEqual([
    {
      color: '#808080',
      fallback: 'key 01:01:01 → hello { meta1: true }',
      mrkdwn_in: ['text'],
      text: 'key *01:01:01* → hello { *meta1:* true }',
      title: 'hello',
    },
  ]);
});
