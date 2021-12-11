import run from '@rollup/plugin-run';
import createRollupConfig from 'pob-babel/createRollupConfig.js';

const watch = process.env.ROLLUP_WATCH === 'true';

export default createRollupConfig({
  plugins: [watch && run({ execArgv: ['--enable-source-maps'] })],
});
