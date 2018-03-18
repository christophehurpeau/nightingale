import levels from 'nightingale-levels';

var index = ((string, { level }) => {
  const outKey = level >= levels.ERROR ? 'stderr' : 'stdout';
  process[outKey].write(`${string}\n`);
});

export default index;
//# sourceMappingURL=index-node8.es.js.map
