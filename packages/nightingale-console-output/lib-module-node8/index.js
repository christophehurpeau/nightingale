import levels from 'nightingale-levels';

export default ((string, { level }) => {
  const outKey = level >= levels.ERROR ? 'stderr' : 'stdout';
  process[outKey].write(`${string}\n`);
});
//# sourceMappingURL=index.js.map