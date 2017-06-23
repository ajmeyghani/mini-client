import buble from 'rollup-plugin-buble';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'js/main.js',
  dest: 'dev-dist/js/main.js',
  format: 'iife',
  plugins: [
    buble(),
    cjs({
      exclude: 'node_modules/process-es6/**',
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true
    })
  ],
  sourceMap: true,
}
