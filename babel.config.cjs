"use strict";

module.exports = function babelConfig(api) {
  const isTest = api.env("test");

  if (!isTest) return {};

  return {
    only: ["packages/*/src", "packages/*/lib"],
    presets: [["pob-babel/preset.js", { modules: false }]],
  };
};
