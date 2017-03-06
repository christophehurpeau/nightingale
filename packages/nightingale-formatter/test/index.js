/* global suite, test */
import ok from 'assert';
import {
  levelToStyles,
  levelToSymbol,
  styleToHtmlStyle,
  styleToHexColor,
  formatObject,
  formatRecordToString,
} from '../';

suite('test exports', () => {
  test('levelToStyles', () => ok(typeof levelToStyles === 'object'));
  test('levelToSymbol', () => ok(typeof levelToSymbol === 'object'));
  test('styleToHtmlStyle', () => ok(typeof styleToHtmlStyle === 'object'));
  test('styleToHexColor', () => ok(typeof styleToHexColor === 'object'));
  test('formatObject', () => ok(typeof formatObject === 'function'));
  test('formatRecordToString', () => ok(typeof formatRecordToString === 'function'));
});
