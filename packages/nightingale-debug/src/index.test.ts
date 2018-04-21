import Level from 'nightingale-levels';
import createFindDebugLevel from './';

describe('created with undefined', () => {
  const findDebugLevel = createFindDebugLevel();
  test('should always return level passed', () => {
    expect(findDebugLevel(Level.ALL, 'app')).toBe(Level.ALL);
    expect(findDebugLevel(Level.TRACE, 'app')).toBe(Level.TRACE);
    expect(findDebugLevel(Level.INFO, 'app')).toBe(Level.INFO);
    expect(findDebugLevel(Level.WARN, 'app')).toBe(Level.WARN);
    expect(findDebugLevel(Level.FATAL, 'app')).toBe(Level.FATAL);
  });
});

describe('created with *', () => {
  const findDebugLevel = createFindDebugLevel('*');
  test('should always return level ALL', () => {
    expect(findDebugLevel(Level.ALL, 'app')).toBe(Level.ALL);
    expect(findDebugLevel(Level.TRACE, 'app')).toBe(Level.ALL);
    expect(findDebugLevel(Level.INFO, 'app')).toBe(Level.ALL);
    expect(findDebugLevel(Level.WARN, 'app')).toBe(Level.ALL);
    expect(findDebugLevel(Level.FATAL, 'app')).toBe(Level.ALL);
  });
});

describe('created with *,-app:*', () => {
  const findDebugLevel = createFindDebugLevel('*,-app:*');
  test('app: should always return level passed', () => {
    expect(findDebugLevel(Level.ALL, 'app')).toBe(Level.ALL);
    expect(findDebugLevel(Level.INFO, 'app')).toBe(Level.INFO);
  });

  test('not app: should always return level ALL', () => {
    expect(findDebugLevel(Level.ALL, 'nightingale')).toBe(Level.ALL);
    expect(findDebugLevel(Level.INFO, 'nightingale')).toBe(Level.ALL);
  });
});

describe('created with nightingale,-nightingale:debug', () => {
  const findDebugLevel = createFindDebugLevel('nightingale,-nightingale:debug');
  test('nightingale:debug: should always return level passed', () => {
    expect(findDebugLevel(Level.ALL, 'nightingale:debug')).toBe(Level.ALL);
    expect(findDebugLevel(Level.INFO, 'nightingale:debug')).toBe(Level.INFO);
  });

  test('nightingale: should always return level ALL', () => {
    expect(findDebugLevel(Level.ALL, 'nightingale')).toBe(Level.ALL);
    expect(findDebugLevel(Level.INFO, 'nightingale')).toBe(Level.ALL);
  });
});
