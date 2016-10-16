import levels from 'nightingale-levels';

export default !BROWSER ? function write(string, { level }) {
  const outKey = level >= levels.ERROR ? 'stderr' : 'stdout';
  process[outKey].write(`${string}\n`);
} : (
  (() => {
    if (console.error) {
      return function write(params, { level }) {
        console[level >= levels.ERROR ? 'error' : 'log'](...params);
      };
    } else {
      return function write(params) {
        console.log(...params);
      };
    }
  })()
);
