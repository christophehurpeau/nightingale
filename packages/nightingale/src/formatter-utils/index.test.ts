import {
  formatObject,
  formatRecordToString,
  levelToStyles,
  levelToSymbol,
  styleToHexColor,
  styleToHtmlStyleThemeDark,
  styleToHtmlStyleThemeLight,
} from ".";

describe("test exports", () => {
  test("levelToStyles", () => {
    expect(typeof levelToStyles).toBe("object");
  });
  test("levelToSymbol", () => {
    expect(typeof levelToSymbol).toBe("object");
  });
  test("styleToHtmlStyleThemeLight", () => {
    expect(typeof styleToHtmlStyleThemeLight).toBe("object");
  });
  test("styleToHtmlStyleThemeDark", () => {
    expect(typeof styleToHtmlStyleThemeDark).toBe("object");
  });
  test("styleToHexColor", () => {
    expect(typeof styleToHexColor).toBe("object");
  });
  test("formatObject", () => {
    expect(typeof formatObject).toBe("function");
  });
  test("formatRecordToString", () => {
    expect(typeof formatRecordToString).toBe("function");
  });
});
