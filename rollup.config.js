import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig();

export default merge(baseConfig, {
  input: './js/index.js',
  output: {
      dir: 'dist',
      name: 'main'
    }
});