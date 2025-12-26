import configs1 from "./packages/nightingale-levels/rollup.config.mjs";
import configs2 from "./packages/nightingale-types/rollup.config.mjs";
import configs3 from "./packages/nightingale-logger/rollup.config.mjs";
import configs4 from "./packages/nightingale-sentry/rollup.config.mjs";
import configs5 from "./packages/nightingale-web-processor/rollup.config.mjs";
import configs6 from "./packages/nightingale-winston-adapter/rollup.config.mjs";
import configs7 from "./packages/nightingale/rollup.config.mjs";
import configs8 from "./packages/nightingale-app-console/rollup.config.mjs";
import configs9 from "./packages/nightingale-app-react-native/rollup.config.mjs";
import configs10 from "./packages/nightingale-slack/rollup.config.mjs";
import configs11 from "./packages/nightingale-unit-testing/rollup.config.mjs";
import configs12 from "./packages/nightingale-console-example/rollup.config.mjs";
import configs13 from "./packages/nightingale-example/rollup.config.mjs";

export default [
  ...configs1,
  ...configs2,
  ...configs3,
  ...configs4,
  ...configs5,
  ...configs6,
  ...configs7,
  ...configs8,
  ...configs9,
  ...configs10,
  ...configs11,
  ...configs12,
  ...configs13,
];
