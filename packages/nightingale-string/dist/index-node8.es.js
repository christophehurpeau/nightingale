import formatterRaw from 'nightingale-raw-formatter';

/* eslint-disable prefer-template */

function index (minLevel) {
  this.minLevel = minLevel;
  this._buffer = '';
  this.handle = record => {
    this._buffer += formatterRaw(record) + '\n';
  };
  Object.defineProperty(this, 'string', {
    get: () => this._buffer
  });
}

export default index;
//# sourceMappingURL=index-node8.es.js.map
