/* eslint-disable prefer-template */
import formatterRaw from 'nightingale-raw-formatter';

import t from 'flow-runtime';
export default function index(minLevel) {
  let _minLevelType = t.number();

  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this._buffer = '';
  this.handle = record => {
    let _recordType = t.object();

    t.param('record', _recordType).assert(record);

    this._buffer += formatterRaw(record) + '\n';
  };
  Object.defineProperty(this, 'string', {
    get: () => this._buffer
  });
}
//# sourceMappingURL=index.js.map