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

export default StringHandler;
export { StringHandler };
//# sourceMappingURL=index-node12.mjs.map
