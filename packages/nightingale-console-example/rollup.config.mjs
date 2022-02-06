import createRollupConfig from 'pob-babel/createRollupConfig.js';
import run from 'pob-babel/plugin-run.cjs';

const watch = process.env.ROLLUP_WATCH === 'true';

export default createRollupConfig({
  cwd: new URL('.', import.meta.url).pathname,
  plugins: [watch && run({ execArgv: ['--enable-source-maps'] })],
});
