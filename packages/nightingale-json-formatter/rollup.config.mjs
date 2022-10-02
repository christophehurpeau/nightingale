import { dirname } from 'path';
import { fileURLToPath } from 'url';
import createRollupConfig from 'pob-babel/createRollupConfig.js';

export default createRollupConfig({
  cwd: dirname(fileURLToPath(import.meta.url)),
});
