import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

const banner =
  '/*!\n' +
  ` * ataola-utils.js v${pkg.version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} ataola(Jiangtao Zheng)\n` +
  ' * Released under the MIT License.\n' +
  ' */';

export default [
  // browser-friendly UMD build
  {
    input: 'index.js',
    output: {
      name: 'ataola-utils',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      banner,
    },
    plugins: [
      json({
        compact: true,
      }),
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
    ],
  },
  {
    input: 'index.js',
    output: [
      { file: pkg.main, format: 'cjs', banner, sourcemap: true },
      { file: pkg.module, format: 'esm', banner, sourcemap: true },
      {
        name: 'ataola-utils',
        file: 'dist/ataola-utils-amd.js',
        format: 'amd',
        extend: true,
        sourcemap: true,
        banner,
      },
      {
        name: 'ataola-utils',
        file: 'dist/ataola-utils.js',
        format: 'iife',
        extend: true,
        sourcemap: true,
        banner,
      },
      {
        name: 'ataola-utils',
        file: 'dist/ataola-utils.min.js',
        format: 'iife',
        extend: true,
        banner,
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      json({
        compact: true,
      }),
      babel({
        // https://github.com/rollup/rollup-plugin-babel#configuring-babel
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
    ],
  },
];
