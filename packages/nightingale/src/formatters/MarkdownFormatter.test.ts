import { Level } from "nightingale-levels";
import { MarkdownFormatter, style } from "./MarkdownFormatter.ts";

test("style: blue bold color", () => {
  expect(style(["blue", "bold"], "test")).toBe("*test*");
});

test("format simple message", () => {
  const record = {
    key: "record.key",
    level: Level.INFO,
    datetime: new Date(2000, 1, 1, 1, 0, 0),
    message: "test",
    metadata: {},
    extra: {},
  };

  expect(MarkdownFormatter.format(record)).toStrictEqual([
    "record.key *01:00:00* → test",
  ]);
});
