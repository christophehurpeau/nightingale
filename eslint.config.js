import pobTypescriptConfig from "@pob/eslint-config-typescript";

export default [
  ...pobTypescriptConfig(import.meta.url).configs.node,
  {
    files: ["**/*.test.ts"],
    settings: {
      "import/core-modules": ["vitest"],
    },
  },
];
