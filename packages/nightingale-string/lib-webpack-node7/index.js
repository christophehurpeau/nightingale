/* eslint-disable prefer-template */
import formatterRaw from 'nightingale-raw-formatter';

export default function (minLevel) {
  this.minLevel = minLevel;
  this._buffer = '';
  this.handle = record => {
    this._buffer += formatterRaw(record) + '\n';
  };
  Object.defineProperty(this, 'string', {
    get: () => this._buffer
  });
}
//# sourceMappingURL=index.js.map