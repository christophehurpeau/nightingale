'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = /**
                    * @function
                   */ function () { /**
                                     * @function
                                     * @param target
                                     * @param props
                                    */ function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return (/**
                                                                                                                                                                                                                                                                                                                                                                            * @function
                                                                                                                                                                                                                                                                                                                                                                            * @param Constructor
                                                                                                                                                                                                                                                                                                                                                                            * @param protoProps
                                                                                                                                                                                                                                                                                                                                                                            * @param staticProps
                                                                                                                                                                                                                                                                                                                                                                           */ function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; } ); }();

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebProcessor = /**
                    * @function
                   */function () {
    /**
     * @function
     * @param request
    */
    function WebProcessor(request) {
        _classCallCheck(this, WebProcessor);

        this.request = request;
    }

    _createClass(WebProcessor, [{
        key: 'process',
        value: /**
                * @function
                * @param record
               */function process(record) {
            record.extra = record.extra || {};
            record.extra.url = this.request.url;
            record.extra.method = this.request.method;
            record.extra.server = this.request.headers.host;
            record.extra.referrer = this.request.referrer;
            record.extra.ip = this.request.headers['x-forwarded-for'] || this.request.connection.remoteAddress;
        }
    }]);

    return WebProcessor;
}();

exports.default = WebProcessor;
//# sourceMappingURL=WebProcessor.js.map