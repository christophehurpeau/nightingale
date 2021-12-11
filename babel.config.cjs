'use strict';

module.exports = function babelConfig(api) {
  const isTest = api.env('test');

  if (!isTest) return {};

  return {
    only: ['packages/*/src'],
    presets: [require.resolve('pob-babel/preset')],
  };
};
