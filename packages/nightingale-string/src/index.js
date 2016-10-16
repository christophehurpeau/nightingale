/* eslint-disable prefer-template */
import formatterRaw from 'nightingale-raw-formatter/src';

export default function (minLevel: number) {
  this.minLevel = minLevel;
  this._buffer = '';
  this.handle = (record: Object) => {
    this._buffer += formatterRaw(record) + '\n';
  };
  Object.defineProperty(this, 'string', {
    get: () => this._buffer,
  });
}
