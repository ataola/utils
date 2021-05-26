import json from '@rollup/plugin-json';

export default {
  input: 'index.js',
  output: [
    {
      format: 'umd',
      name: 'utils',
      file: 'build/utils.js',
      indent: '\t',
    },
    {
      format: 'es',
      name: 'utils',
      file: 'build/utils.module.js',
      indent: '\t',
    },
  ],
  plugins: [
    json({
      compact: true,
    }),
  ],
};
