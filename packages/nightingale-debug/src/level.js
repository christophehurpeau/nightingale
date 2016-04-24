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

    if (debugValue.some(value => value === '*')) {
        return (minLevel) => levels.ALL;
    }

    const minimatchPatterns = debugValue.map(pattern => new Minimatch(pattern));

    return (minLevel = levels.INFO, key) => {
        if (minLevel <= levels.TRACE || !key) {
            return minLevel;
        }

        return minimatchPatterns.some(p => p.match(key)) ? levels.ALL : minLevel;
    };
}
