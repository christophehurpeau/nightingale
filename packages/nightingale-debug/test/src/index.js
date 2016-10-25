/* global suite, test */
import levels from 'nightingale-levels';
import { strictEqual } from 'assert';
import createFindDebugLevel from '../../src';

suite('created with undefined', () => {
  const findDebugLevel = createFindDebugLevel();
  test('should always return level passed', () => {
    strictEqual(findDebugLevel(levels.ALL, 'app'), levels.ALL);
    strictEqual(findDebugLevel(levels.TRACE, 'app'), levels.TRACE);
    strictEqual(findDebugLevel(levels.INFO, 'app'), levels.INFO);
    strictEqual(findDebugLevel(levels.WARN, 'app'), levels.WARN);
    strictEqual(findDebugLevel(levels.FATAL, 'app'), levels.FATAL);
  });
});


suite('created with *', () => {
  const findDebugLevel = createFindDebugLevel('*');
  test('should always return level ALL', () => {
    strictEqual(findDebugLevel(levels.ALL, 'app'), levels.ALL);
    strictEqual(findDebugLevel(levels.TRACE, 'app'), levels.ALL);
    strictEqual(findDebugLevel(levels.INFO, 'app'), levels.ALL);
    strictEqual(findDebugLevel(levels.WARN, 'app'), levels.ALL);
    strictEqual(findDebugLevel(levels.FATAL, 'app'), levels.ALL);
  });
});

suite('created with *,-app:*', () => {
  const findDebugLevel = createFindDebugLevel('*,-app:*');
  test('app: should always return level passed', () => {
    strictEqual(findDebugLevel(levels.ALL, 'app'), levels.ALL);
    strictEqual(findDebugLevel(levels.INFO, 'app'), levels.INFO);
  });

  test('not app: should always return level ALL', () => {
    strictEqual(findDebugLevel(levels.ALL, 'nightingale'), levels.ALL);
    strictEqual(findDebugLevel(levels.INFO, 'nightingale'), levels.ALL);
  });
});


suite('created with nightingale,-nightingale:debug', () => {
  const findDebugLevel = createFindDebugLevel('nightingale,-nightingale:debug');
  test('nightingale:debug: should always return level passed', () => {
    strictEqual(findDebugLevel(levels.ALL, 'nightingale:debug'), levels.ALL);
    strictEqual(findDebugLevel(levels.INFO, 'nightingale:debug'), levels.INFO);
  });

  test('nightingale: should always return level ALL', () => {
    strictEqual(findDebugLevel(levels.ALL, 'nightingale'), levels.ALL);
    strictEqual(findDebugLevel(levels.INFO, 'nightingale'), levels.ALL);
  });
});
