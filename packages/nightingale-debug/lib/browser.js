'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _level = require('./level');

var _level2 = _interopRequireDefault(_level);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const findLevel = (0, _level2.default)((() => {
    const querystring = location.search;
    let debugFromLocalStorage = global.localStorage && localStorage.DEBUG && localStorage.DEBUG || '';

    if (!querystring) {
        return debugFromLocalStorage;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
    const debugFromQueryString = decodeURI(querystring.replace(new RegExp('^(?:.*[&\\?]' + 'DEBUG' + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));

    return (debugFromLocalStorage && `${ debugFromLocalStorage },`) + debugFromQueryString;
})());
exports.default = findLevel;
//# sourceMappingURL=browser.js.map