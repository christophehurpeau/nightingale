import pobConfig from "@pob/eslint-config";

export default [
  ...pobConfig.configs.node,
  {
    files: ["**/*.test.ts"],
    settings: {
      "import-x/core-modules": ["vitest"],
    },
  },
  {
    files: ["**/package.json"],
    rules: {
      // packages depend on each other with exact versions, bumped together by
      // pob-version: keep them instead of the workspace: protocol
      "check-package-dependencies/require-workspace-protocol": "off",
    },
  },
];
