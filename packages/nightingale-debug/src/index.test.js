import levels from 'nightingale-levels';
import createFindDebugLevel from './';

describe('created with undefined', () => {
  const findDebugLevel = createFindDebugLevel();
  test('should always return level passed', () => {
    expect(findDebugLevel(levels.ALL, 'app')).toBe(levels.ALL);
    expect(findDebugLevel(levels.TRACE, 'app')).toBe(levels.TRACE);
    expect(findDebugLevel(levels.INFO, 'app')).toBe(levels.INFO);
    expect(findDebugLevel(levels.WARN, 'app')).toBe(levels.WARN);
    expect(findDebugLevel(levels.FATAL, 'app')).toBe(levels.FATAL);
  });
});

describe('created with *', () => {
  const findDebugLevel = createFindDebugLevel('*');
  test('should always return level ALL', () => {
    expect(findDebugLevel(levels.ALL, 'app')).toBe(levels.ALL);
    expect(findDebugLevel(levels.TRACE, 'app')).toBe(levels.ALL);
    expect(findDebugLevel(levels.INFO, 'app')).toBe(levels.ALL);
    expect(findDebugLevel(levels.WARN, 'app')).toBe(levels.ALL);
    expect(findDebugLevel(levels.FATAL, 'app')).toBe(levels.ALL);
  });
});

describe('created with *,-app:*', () => {
  const findDebugLevel = createFindDebugLevel('*,-app:*');
  test('app: should always return level passed', () => {
    expect(findDebugLevel(levels.ALL, 'app')).toBe(levels.ALL);
    expect(findDebugLevel(levels.INFO, 'app')).toBe(levels.INFO);
  });

  test('not app: should always return level ALL', () => {
    expect(findDebugLevel(levels.ALL, 'nightingale')).toBe(levels.ALL);
    expect(findDebugLevel(levels.INFO, 'nightingale')).toBe(levels.ALL);
  });
});

describe('created with nightingale,-nightingale:debug', () => {
  const findDebugLevel = createFindDebugLevel('nightingale,-nightingale:debug');
  test('nightingale:debug: should always return level passed', () => {
    expect(findDebugLevel(levels.ALL, 'nightingale:debug')).toBe(levels.ALL);
    expect(findDebugLevel(levels.INFO, 'nightingale:debug')).toBe(levels.INFO);
  });

  test('nightingale: should always return level ALL', () => {
    expect(findDebugLevel(levels.ALL, 'nightingale')).toBe(levels.ALL);
    expect(findDebugLevel(levels.INFO, 'nightingale')).toBe(levels.ALL);
  });
});
