import { Level } from "nightingale-levels";
import { RawFormatter, style } from "./RawFormatter";

test("style: blue bold color", () => {
  expect(style(["blue", "bold"], "test")).toBe("test");
});

test("format simple message", () => {
  const record = {
    key: "record.key",
    level: Level.INFO,
    datetime: new Date(2000, 1, 1, 1, 0, 0),
    message: "record.message",
    metadata: {},
    extra: {},
  };

  expect(RawFormatter.format(record)).toBe(
    "record.key 01:00:00 → record.message",
  );
});
