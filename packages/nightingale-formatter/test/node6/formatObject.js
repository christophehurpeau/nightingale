'use strict';

var _assert = require('assert');

var _ = require('../..');

/* global suite, test */
/* eslint-disable max-len */
suite('formatObject', () => {
  test('empty object should return empty string', () => {
    (0, _assert.strictEqual)((0, _.formatObject)({}), '');
  });

  const styleFn = (styles, value) => styles && styles.length ? `[styles:${ styles.join(',') }]${ value }[/styles]` : value;

  const noStyleFn = (styles, value) => value;

  test('simple object', () => {
    (0, _assert.strictEqual)((0, _.formatObject)({ a: 1 }, styleFn), '{ [styles:gray-light,bold]a:[/styles] [styles:yellow]1[/styles] }');
  });

  test('simple without prototype', () => {
    (0, _assert.strictEqual)((0, _.formatObject)(Object.assign(Object.create(null), { a: 1 }), styleFn), '{ [styles:gray-light,bold]a:[/styles] [styles:yellow]1[/styles] }');
  });

  test('long object', () => {
    (0, _assert.strictEqual)((0, _.formatObject)({
      obj: {
        a: 10000000000000000000,
        b: 10000000000000000000,
        c: 10000000000000000000,
        d: 10000000000000000000,
        e: 10000000000000000000,
        f: 10000000000000000000
      }
    }, noStyleFn), '{\n  obj: { a: 10000000000000000000, b: 10000000000000000000, c: 10000000000000000000, d: 10000000000000000000, e: 10000000000000000000, f: 10000000000000000000 },\n}');
  });

  test('simple embeded empty object', () => {
    (0, _assert.strictEqual)((0, _.formatObject)({ a: {} }, noStyleFn), '{ a: {} }');
  });

  test('simple embeded object', () => {
    (0, _assert.strictEqual)((0, _.formatObject)({ a: { b: 1 } }, noStyleFn), '{ a: { b: 1 } }');
  });

  test('simple recursive object', () => {
    let a = { a: 1 };
    a.a = a;
    (0, _assert.strictEqual)((0, _.formatObject)({ a }, noStyleFn), '{ a: { a: {Circular object} } }');
  });

  test('empty array', () => {
    (0, _assert.strictEqual)((0, _.formatObject)({ a: [] }, noStyleFn), '{ a: [] }');
  });

  test('simple array', () => {
    (0, _assert.strictEqual)((0, _.formatObject)({ a: [1, '2', 3, 4, 5] }, noStyleFn), '{ a: [1, "2", 3, 4, 5] }');
  });

  test('object in array', () => {
    (0, _assert.strictEqual)((0, _.formatObject)({ a: [{ a: 1, b: 2 }] }, noStyleFn), '{ a: [{ a: 1, b: 2 }] }');
  });

  test('objects in array', () => {
    const obj = { a: 1, b: 2 };
    (0, _assert.strictEqual)((0, _.formatObject)({ a: [obj, obj] }, noStyleFn), '{ a: [{ a: 1, b: 2 }, { a: 1, b: 2 }] }');
  });

  test('objects with breaking lines in array', () => {
    const obj = {
      a: 10000000000000000000,
      b: 10000000000000000000,
      c: 10000000000000000000,
      d: 10000000000000000000,
      e: 10000000000000000000,
      f: 10000000000000000000
    };
    (0, _assert.strictEqual)((0, _.formatObject)({ a: [obj, obj] }, noStyleFn), `{
  a: [
    { a: 10000000000000000000, b: 10000000000000000000, c: 10000000000000000000, d: 10000000000000000000, e: 10000000000000000000, f: 10000000000000000000 },
    { a: 10000000000000000000, b: 10000000000000000000, c: 10000000000000000000, d: 10000000000000000000, e: 10000000000000000000, f: 10000000000000000000 },
  ],
}`);
  });
});
//# sourceMappingURL=formatObject.js.map