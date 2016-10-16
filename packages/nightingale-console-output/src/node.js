import levels from 'nightingale-levels';

export default function write(string, { level }) {
  const outKey = level >= levels.ERROR ? 'stderr' : 'stdout';
  process[outKey].write(`${string}\n`);
}
