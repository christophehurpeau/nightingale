import { IsHandling, Handle, Level } from 'nightingale-types';
export default class ConsoleHandler {
    minLevel: Level;
    isHandling: IsHandling;
    handle: Handle;
    constructor(minLevel: Level);
}
