/* eslint-disable max-len */
import { Styles } from 'nightingale-types';
import formatObject from './formatObject';

test('empty object should return empty string', () => {
  expect(formatObject({})).toBe('');
});

const styleFn = (styles: Styles, value: string) =>
  styles && styles.length !== 0
    ? `[styles:${styles.join(',')}]${value}[/styles]`
    : value;

const noStyleFn = (styles: Styles, value: string) => value;

test('simple object', () => {
  expect(formatObject({ a: 1 }, styleFn)).toBe(
    '{ [styles:gray-light,bold]a:[/styles] [styles:yellow]1[/styles] }',
  );
});

test('simple without prototype', () => {
  expect(
    formatObject(Object.assign(Object.create(null), { a: 1 }), styleFn),
  ).toBe('{ [styles:gray-light,bold]a:[/styles] [styles:yellow]1[/styles] }');
});

test('long object', () => {
  expect(
    formatObject(
      {
        obj: {
          a: 10000000000000000000,
          b: 10000000000000000000,
          c: 10000000000000000000,
          d: 10000000000000000000,
          e: 10000000000000000000,
          f: 10000000000000000000,
        },
      },
      noStyleFn,
    ),
  ).toBe(
    '{\n  obj: { a: 10000000000000000000, b: 10000000000000000000, c: 10000000000000000000, d: 10000000000000000000, e: 10000000000000000000, f: 10000000000000000000 },\n}',
  );
});

test('simple embeded empty object', () => {
  expect(formatObject({ a: {} }, noStyleFn)).toBe('{ a: {} }');
});

test('simple embeded object', () => {
  expect(formatObject({ a: { b: 1 } }, noStyleFn)).toBe('{ a: { b: 1 } }');
});

test('simple recursive object', () => {
  const a: { a: any } = { a: 1 };
  a.a = a;
  expect(a.a).toBe(a);
  expect(formatObject({ a }, noStyleFn)).toBe(
    '{ a: { a: {Circular Object} } }',
  );
});

test('empty map', () => {
  expect(formatObject({ a: new Map() }, noStyleFn)).toBe('{ a: Map {} }');
});

test('simple map', () => {
  expect(
    formatObject(
      { a: new Map<any, any>([['key1', 'value1'], [{ b: 1 }, 'value2']]) },
      noStyleFn,
    ),
  ).toBe('{ a: Map { "key1": "value1", { b: 1 }: "value2" } }');
});

test('empty array', () => {
  expect(formatObject({ a: [] }, noStyleFn)).toBe('{ a: [] }');
});

test('simple array', () => {
  expect(formatObject({ a: [1, '2', 3, 4, 5] }, noStyleFn)).toBe(
    '{ a: [1, "2", 3, 4, 5] }',
  );
});

test('object in array', () => {
  const obj = { a: 1, b: 2 };
  expect(formatObject({ a: [obj] }, noStyleFn)).toBe('{ a: [{ a: 1, b: 2 }] }');
});

test('objects in array', () => {
  const obj = { a: 1, b: 2 };
  expect(formatObject({ a: [obj, obj] }, noStyleFn)).toBe(
    '{ a: [{ a: 1, b: 2 }, { a: 1, b: 2 }] }',
  );
});

test('objects with breaking lines in array', () => {
  const obj = {
    a: 10000000000000000000,
    b: 10000000000000000000,
    c: 10000000000000000000,
    d: 10000000000000000000,
    e: 10000000000000000000,
    f: 10000000000000000000,
  };
  expect(formatObject({ a: [obj, obj] }, noStyleFn)).toBe(
    `{
  a: [
    { a: 10000000000000000000, b: 10000000000000000000, c: 10000000000000000000, d: 10000000000000000000, e: 10000000000000000000, f: 10000000000000000000 },
    { a: 10000000000000000000, b: 10000000000000000000, c: 10000000000000000000, d: 10000000000000000000, e: 10000000000000000000, f: 10000000000000000000 },
  ],
}`,
  );
});

test('empty set', () => {
  expect(formatObject({ a: new Set() }, noStyleFn)).toBe('{ a: Set [] }');
});

test('simple set', () => {
  expect(formatObject({ a: new Set(['value1', 'value2']) }, noStyleFn)).toBe(
    '{ a: Set [ "value1", "value2" ] }',
  );
});
