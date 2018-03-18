import format, { style } from './';

test('blue bold color', () => {
  expect(style(['blue', 'bold'], 'test')).toBe(
    '<span style="color: #00a0ff; font-weight: bold">test</span>',
  );
});

test('format simple message', () => {
  expect(format({ message: 'test' })).toBe('test');
});
