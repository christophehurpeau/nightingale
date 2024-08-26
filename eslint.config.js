import pobTypescriptConfig from "@pob/eslint-config-typescript";

export default [...pobTypescriptConfig(import.meta.url).configs.node];
