'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formatterRaw = _interopDefault(require('nightingale-raw-formatter'));

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var StringHandler =
/*#__PURE__*/
function () {
  function StringHandler(minLevel) {
    this.minLevel = void 0;
    this._buffer = '';
    this.minLevel = minLevel;
  }

  var _proto = StringHandler.prototype;

  _proto.handle = function handle(record) {
    this._buffer += formatterRaw(record) + '\n';
  };

  _createClass(StringHandler, [{
    key: "string",
    get: function get() {
      return this._buffer;
    }
  }]);

  return StringHandler;
}();

exports.default = StringHandler;
//# sourceMappingURL=index-node4.cjs.js.map
