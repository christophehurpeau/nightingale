'use strict';

const path = require('path');

module.exports = (api) => {
  const isTest = api.env('test');

  if (!isTest) return {};

  return {
    only: [path.resolve(__dirname, 'src')],
    presets: [require.resolve('pob-babel/preset')],
  };
};
