"use strict";

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

var LayoutDefault = /**
                     * @function
                    */function () {
    /**
     * @function
     * @param formatter
    */
    function LayoutDefault(formatter) {
        _classCallCheck(this, LayoutDefault);

        this.formatter = formatter;
    }

    _createClass(LayoutDefault, [{
        key: "format",
        value: /**
                * @function
                * @param record
               */function format(record) {
            return this.formatter.format(record) + "\n";
        }
    }]);

    return LayoutDefault;
}();

exports.default = LayoutDefault;
//# sourceMappingURL=LayoutDefault.js.map