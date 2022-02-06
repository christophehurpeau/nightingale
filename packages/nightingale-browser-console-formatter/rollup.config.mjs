import createRollupConfig from 'pob-babel/createRollupConfig.js';

export default createRollupConfig({
  cwd: new URL('.', import.meta.url).pathname,
});
