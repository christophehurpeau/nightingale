import { Minimatch } from 'minimatch';
import levels from 'nightingale-levels';

export default function level(debugValue) {
    debugValue = (debugValue || '');

    if (!Array.isArray(debugValue)) {
        debugValue = debugValue.trim().split(',');
    }

    if (debugValue.length === 0) {
        return (minLevel = levels.INFO) => minLevel;
    }

    const minimatchPatterns = debugValue.map(pattern => new Minimatch(pattern));

    return (minLevel = levels.INFO, key) => minLevel <= levels.TRACE ? minLevel :
        (minimatchPatterns.some(p => p.match(key)) ? levels.ALL : minLevel);
}
