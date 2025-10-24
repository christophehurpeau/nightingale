import type { Styles } from "nightingale-types";
import { formatObject } from "./formatObject.ts";

test("empty object should return empty string", () => {
  expect(formatObject({})).toBe("");
});

const styleFn = (styles: Styles, value: string): string =>
  styles && styles.length > 0
    ? `[styles:${styles.join(",")}]${value}[/styles]`
    : value;

const noStyleFn = (styles: Styles, value: string): string => value;

test("simple object", () => {
  expect(formatObject({ a: 1 }, styleFn)).toBe(
    "{ [styles:dim,bold]a:[/styles] [styles:yellow]1[/styles] }",
  );
});

test("simple without prototype", () => {
  expect(
    formatObject(
      Object.assign(Object.create(null) as Record<string, number>, { a: 1 }),
      styleFn,
    ),
  ).toBe("{ [styles:dim,bold]a:[/styles] [styles:yellow]1[/styles] }");
});

test("long object", () => {
  expect(
    formatObject(
      {
        obj: {
          a: 10_000_000_000_000_000_000,
          b: 10_000_000_000_000_000_000,
          c: 10_000_000_000_000_000_000,
          d: 10_000_000_000_000_000_000,
          e: 10_000_000_000_000_000_000,
          f: 10_000_000_000_000_000_000,
        },
      },
      noStyleFn,
    ),
  ).toBe(
    "{\n  obj: { a: 10_000_000_000_000_000_000, b: 10_000_000_000_000_000_000, c: 10_000_000_000_000_000_000, d: 10_000_000_000_000_000_000, e: 10_000_000_000_000_000_000, f: 10_000_000_000_000_000_000 },\n}",
  );
});

test("multiple values", () => {
  expect(
    formatObject(
      {
        // eslint-disable-next-line object-shorthand
        undefined: undefined,
        null: null,
        number: 1,
        string: "s",
        bigInt: BigInt(1),
        symbol: Symbol("symbol"),
        date: new Date(Date.UTC(2000, 1, 1, 1, 0, 0)),
        function: function test() {},
      },
      styleFn,
    ),
  ).toBe(
    '{ [styles:dim,bold]undefined:[/styles] [styles:dim]undefined[/styles][styles:gray],[/styles] [styles:dim,bold]null:[/styles] [styles:bold]null[/styles][styles:gray],[/styles] [styles:dim,bold]number:[/styles] [styles:yellow]1[/styles][styles:gray],[/styles] [styles:dim,bold]string:[/styles] [styles:orange]"s"[/styles][styles:gray],[/styles] [styles:dim,bold]bigInt:[/styles] [styles:yellow,bold][BigInt: 1][/styles][styles:gray],[/styles] [styles:dim,bold]symbol:[/styles] [styles:magenta]Symbol(symbol)[/styles][styles:gray],[/styles] [styles:dim,bold]date:[/styles] [styles:magenta][Date: 2000-02-01T01:00:00.000Z][/styles][styles:gray],[/styles] [styles:dim,bold]function:[/styles] [styles:blue][Function: test][/styles] }',
  );
});

test("simple embeded empty object", () => {
  expect(formatObject({ a: {} }, noStyleFn)).toBe("{ a: {} }");
});

test("simple embeded object", () => {
  expect(formatObject({ a: { b: 1 } }, noStyleFn)).toBe("{ a: { b: 1 } }");
});

test("simple recursive object", () => {
  const a: { a: any } = { a: 1 };
  a.a = a;
  expect(a.a).toBe(a);
  expect(formatObject({ a }, noStyleFn)).toBe(
    "{ a: { a: {Circular Object} } }",
  );
});

test("empty map", () => {
  expect(formatObject({ a: new Map() }, noStyleFn)).toBe("{ a: Map {} }");
});

test("simple map", () => {
  expect(
    formatObject(
      {
        a: new Map<any, any>([
          ["key1", "value1"],
          [{ b: 1 }, "value2"],
        ]),
      },
      noStyleFn,
    ),
  ).toBe('{ a: Map { "key1": "value1", { b: 1 }: "value2" } }');
});

test("empty array", () => {
  expect(formatObject({ a: [] }, noStyleFn)).toBe("{ a: [] }");
});

test("simple array", () => {
  expect(formatObject({ a: [1, "2", 3, 4, 5] }, noStyleFn)).toBe(
    '{ a: [1, "2", 3, 4, 5] }',
  );
});

test("object in array", () => {
  const obj = { a: 1, b: 2 };
  expect(formatObject({ a: [obj] }, noStyleFn)).toBe("{ a: [{ a: 1, b: 2 }] }");
});

test("objects in array", () => {
  const obj = { a: 1, b: 2 };
  expect(formatObject({ a: [obj, obj] }, noStyleFn)).toBe(
    "{ a: [{ a: 1, b: 2 }, { a: 1, b: 2 }] }",
  );
});

test("objects with breaking lines in array", () => {
  const obj = {
    a: 10_000_000_000_000_000_000,
    b: 10_000_000_000_000_000_000,
    c: 10_000_000_000_000_000_000,
    d: 10_000_000_000_000_000_000,
    e: 10_000_000_000_000_000_000,
    f: 10_000_000_000_000_000_000,
  };
  expect(formatObject({ a: [obj, obj] }, noStyleFn)).toBe(
    `{
  a: [
    { a: 10_000_000_000_000_000_000, b: 10_000_000_000_000_000_000, c: 10_000_000_000_000_000_000, d: 10_000_000_000_000_000_000, e: 10_000_000_000_000_000_000, f: 10_000_000_000_000_000_000 },
    { a: 10_000_000_000_000_000_000, b: 10_000_000_000_000_000_000, c: 10_000_000_000_000_000_000, d: 10_000_000_000_000_000_000, e: 10_000_000_000_000_000_000, f: 10_000_000_000_000_000_000 },
  ],
}`,
  );
});

test("empty set", () => {
  expect(formatObject({ a: new Set() }, noStyleFn)).toBe("{ a: Set [] }");
});

test("simple set", () => {
  expect(formatObject({ a: new Set(["value1", "value2"]) }, noStyleFn)).toBe(
    '{ a: Set [ "value1", "value2" ] }',
  );
});

test("date", () => {
  const date = new Date(Date.UTC(2020, 1, 1, 1, 0, 0));
  expect(formatObject({ a: date }, styleFn)).toBe(
    "{ [styles:dim,bold]a:[/styles] [styles:magenta][Date: 2020-02-01T01:00:00.000Z][/styles] }",
  );
});

test("function", () => {
  const fn = () => {};
  expect(formatObject({ a: fn }, styleFn)).toBe(
    "{ [styles:dim,bold]a:[/styles] [styles:blue][Function: fn][/styles] }",
  );
});

describe("number", () => {
  test("-0", () => {
    expect(formatObject({ a: -0 }, styleFn)).toBe(
      "{ [styles:dim,bold]a:[/styles] [styles:yellow]-0[/styles] }",
    );
  });

  test("NaN", () => {
    expect(formatObject({ a: NaN }, styleFn)).toBe(
      "{ [styles:dim,bold]a:[/styles] [styles:yellow]NaN[/styles] }",
    );
  });

  test("Infinity", () => {
    expect(formatObject({ a: Infinity }, styleFn)).toBe(
      "{ [styles:dim,bold]a:[/styles] [styles:yellow]+Infinity[/styles] }",
    );
  });
  test("-Infinity", () => {
    expect(formatObject({ a: -Infinity }, styleFn)).toBe(
      "{ [styles:dim,bold]a:[/styles] [styles:yellow]-Infinity[/styles] }",
    );
  });
  test("BigInt", () => {
    expect(formatObject({ a: BigInt(1) }, styleFn)).toBe(
      "{ [styles:dim,bold]a:[/styles] [styles:yellow,bold][BigInt: 1][/styles] }",
    );
  });
  test("exponential", () => {
    expect(formatObject({ a: 1e100 }, styleFn)).toBe(
      "{ [styles:dim,bold]a:[/styles] [styles:yellow]1e+100[/styles] }",
    );
  });
  test("long number", () => {
    expect(formatObject({ a: 10_000_000_000_000_000_000 }, styleFn)).toBe(
      "{ [styles:dim,bold]a:[/styles] [styles:yellow]10_000_000_000_000_000_000[/styles] }",
    );
  });
  test("long number with decimal", () => {
    expect(formatObject({ a: 10_000.123_12 }, styleFn)).toBe(
      "{ [styles:dim,bold]a:[/styles] [styles:yellow]10_000.123_12[/styles] }",
    );
  });
});
