import type { StyleToHtmlStyle } from 'nightingale-formatter';
import { styleToHtmlStyleThemeLight } from 'nightingale-formatter';
import Level from 'nightingale-levels';
import { createBrowserConsoleFormatter, style } from '.';

const styleToHtmlStyle: StyleToHtmlStyle = styleToHtmlStyleThemeLight;
const formatWithLightTheme = createBrowserConsoleFormatter('light');
const formatWithDarkTheme = createBrowserConsoleFormatter('dark');

test('style: blue bold color', () => {
  const args: string[] = [];
  expect(style(styleToHtmlStyle, args)(['blue', 'bold'], 'test')).toBe(
    '%ctest%c',
  );
  expect(args).toEqual([
    'color: #00a0ff; font-weight: bold',
    'color: initial; font-weight: normal',
  ]);
});

test('format simple message, with light theme', () => {
  const record = {
    key: 'record.key',
    level: Level.INFO,
    datetime: new Date(2000, 1, 1, 1, 0, 0),
    message: 'test',
    metadata: {},
    extra: {},
  };

  const [string, ...args] = formatWithLightTheme(record);
  expect(string).toBe('%crecord.key%c %c01:00:00%c → test');
  expect(args).toEqual([
    'color: #808080',
    'color: currentcolor',
    'color: gray; font-weight: bold',
    'color: currentcolor; font-weight: normal',
  ]);
});

test('format simple message, with dark theme', () => {
  const record = {
    key: 'record.key',
    level: Level.INFO,
    datetime: new Date(2000, 1, 1, 1, 0, 0),
    message: 'test',
    metadata: {},
    extra: {},
  };

  const [string, ...args] = formatWithDarkTheme(record);
  expect(string).toBe('%crecord.key%c %c01:00:00%c → test');
  expect(args).toEqual([
    'color: #808080',
    'color: currentcolor',
    'color: lightgray; font-weight: bold',
    'color: currentcolor; font-weight: normal',
  ]);
});
