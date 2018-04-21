import {
  levelToStyles,
  levelToSymbol,
  styleToHtmlStyle,
  styleToHexColor,
  formatObject,
  formatRecordToString,
} from './';

describe('test exports', () => {
  test('levelToStyles', () => expect(typeof levelToStyles).toBe('object'));
  test('levelToSymbol', () => expect(typeof levelToSymbol).toBe('object'));
  test('styleToHtmlStyle', () => expect(typeof styleToHtmlStyle).toBe('object'));
  test('styleToHexColor', () => expect(typeof styleToHexColor).toBe('object'));
  test('formatObject', () => expect(typeof formatObject).toBe('function'));
  test('formatRecordToString', () => expect(typeof formatRecordToString).toBe('function'));
});
