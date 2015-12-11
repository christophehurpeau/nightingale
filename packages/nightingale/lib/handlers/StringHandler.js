'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Handler = require('../Handler');

var _Handler2 = _interopRequireDefault(_Handler);

var _LayoutDefault = require('../layouts/LayoutDefault');

var _LayoutDefault2 = _interopRequireDefault(_LayoutDefault);

var _formatterRaw = require('../formatters/formatterRaw');

var formatterRaw = _interopRequireWildcard(_formatterRaw);

var _OutputString = require('../outputs/OutputString');

var _OutputString2 = _interopRequireDefault(_OutputString);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let StringHandler = class StringHandler extends _Handler2.default {
    /**
     * @param {int} minLevel
     */
    constructor(minLevel) {
        super(minLevel, new _LayoutDefault2.default(formatterRaw), new _OutputString2.default());
    }

    get string() {
        return this.output.string;
    }

};
exports.default = StringHandler;
//# sourceMappingURL=StringHandler.js.map