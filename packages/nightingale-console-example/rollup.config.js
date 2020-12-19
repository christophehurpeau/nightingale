'use strict';

const run = require('@rollup/plugin-run');

const watch = process.env.ROLLUP_WATCH === 'true';

module.exports = require('pob-babel/lib/createRollupConfig')({
  devPlugins: [
    watch && run({ execArgv: ['--enable-source-maps'] })
  ],
});
