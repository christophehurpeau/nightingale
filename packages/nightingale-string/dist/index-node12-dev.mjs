import formatterRaw from 'nightingale-raw-formatter';

/* eslint-disable prefer-template */
class StringHandler {
  constructor(minLevel) {
    this._buffer = '';
    this.minLevel = minLevel;
  }

  get string() {
    return this._buffer;
  }

  handle(record) {
    this._buffer += formatterRaw(record) + '\n';
  }

}

export { StringHandler, StringHandler as default };
//# sourceMappingURL=index-node12-dev.mjs.map
