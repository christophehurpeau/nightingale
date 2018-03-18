import format, { style } from './';

test('style: blue bold color', () => {
  const args = [];
  expect(style(args)(['blue', 'bold'], 'test')).toBe('%ctest%c');
  expect(args).toBe(['color: #00a0ff; font-weight: bold', 'color: initial; font-weight: normal']);
});

test('format simple message', () => {
  const [string, ...args] = format({ message: 'test' });
  expect(string).toBe('test');
  expect(args).toBe([]);
});
