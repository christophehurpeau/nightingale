import levels from 'nightingale-levels';

export default function write(string, logLevel) {
    const outKey = logLevel >= levels.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${string}\n`);
}
