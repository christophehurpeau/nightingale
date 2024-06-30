import { BrowserConsoleFormatter } from "nightingale";

/**
 *
 * param is dark or light
 * @param {"light" | "dark"} [theme="light"]
 * @returns {import("nightingale").StringArrayNightingaleFormatter["format"]}
 */
export default function createBrowserConsoleFormatter(theme = "light") {
  const formatter = new BrowserConsoleFormatter(theme);
  return (record) => formatter.format(record);
}
