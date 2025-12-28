import pobConfig from "@pob/eslint-config";

export default [
  ...pobConfig(import.meta.url).configs.node,
  {
    files: ["**/*.test.ts"],
    settings: {
      "import-x/core-modules": ["vitest"],
    },
  },
];
