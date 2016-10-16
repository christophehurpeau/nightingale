/* eslint no-console: 0 */
import levels from 'nightingale-levels';

const write = (() => {
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

export default write;
