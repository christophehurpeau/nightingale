import format, { style } from './';

test('style: blue bold color', () => {
  expect(style(['blue', 'bold'], 'test')).toBe('test');
});

test('format simple message', () => {
  expect(format({ message: 'test' })).toBe('test');
});
