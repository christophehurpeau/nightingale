import formatterRaw from 'nightingale-raw-formatter';

/* eslint-disable prefer-template */
class StringHandler {
  _buffer = '';
  constructor(minLevel) {
    this.minLevel = minLevel;
  }
  get string() {
    return this._buffer;
  }
  handle(record) {
    this._buffer += formatterRaw(record) + '\n';
  }
}

export { StringHandler };
//# sourceMappingURL=index-node16.mjs.map
