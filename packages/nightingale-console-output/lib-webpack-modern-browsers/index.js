import levels from 'nightingale-levels';

export default (() => {
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
//# sourceMappingURL=index.js.map