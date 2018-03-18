import levels from 'nightingale-levels';

var index = (function () {
  if (console.error) {
    return function write(params, { level }) {
      console[level >= levels.ERROR ? 'error' : 'log'](...params);
    };
  } else {
    return function write(params) {
      console.log(...params);
    };
  }
})();

export default index;
//# sourceMappingURL=index-browsermodern.es.js.map
