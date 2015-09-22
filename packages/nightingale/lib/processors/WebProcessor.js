'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});
/** @class WebProcessor 
* @param request */
let WebProcessor = (function () {
    function WebProcessor(request) {
        _classCallCheck(this, WebProcessor);

        this.request = request;
    }

    _createClass(WebProcessor, [{
        key: 'process',
        /** @memberof WebProcessor 
        * @instance 
        * @method process 
        * @param record */value: function process(record) {
            record.extra = record.extra || {};
            record.extra.url = this.request.url;
            record.extra.method = this.request.method;
            record.extra.server = this.request.headers.host;
            record.extra.referrer = this.request.referrer;
            record.extra.ip = this.request.headers['x-forwarded-for'] || this.request.connection.remoteAddress;
        }
    }]);

    return WebProcessor;
})();

exports.default = WebProcessor;
module.exports = exports.default;
//# sourceMappingURL=WebProcessor.js.map