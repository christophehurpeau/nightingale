import { Level } from "nightingale-levels";

export type LevelToStyles = Readonly<Record<number, string[]>>;

export const levelToStyles: LevelToStyles = {
  [Level.TRACE]: ["gray"],
  [Level.DEBUG]: ["gray"],
  // [Level.INFO]: ['gray'],
  [Level.WARN]: ["yellow"],
  [Level.ERROR]: ["red", "bold"],
  [Level.CRITICAL]: ["red", "bold"],
  [Level.FATAL]: ["bgRed", "white"],
  [Level.EMERGENCY]: ["bgRed", "white"],
};
