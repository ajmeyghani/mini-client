const rollup = require('rollup');
const cjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const eslint = require('rollup-plugin-eslint');

module.exports = function(jsConfig, rollupConfig, writeConfig) {
  return function() {
    var cache;
    var defaultRollupConfig = {
      entry: jsConfig.input,
      cache: cache,
      external: ['angular'],
      plugins: [
        cjs({
          exclude: 'node_modules/process-es6/**',
        }),
        resolve({
          browser: true,
          main: true
        }),
        eslint({
          exclude: ['**/*.html']
        })
      ].concat(jsConfig.plugins || []),
    };
    var defaultWriteConfig = {
      format: 'iife',
      sourceMap: true,
      dest: jsConfig.output
    };

    rollupConfig = rollupConfig || defaultRollupConfig;
    writeConfig = writeConfig || defaultWriteConfig;

    rollup.rollup(rollupConfig)
      .then(bundle => {
        cache = bundle;
        bundle.write(writeConfig);
      })
      .then(() => console.log('Finished building the js bundle.'))
      .catch(console.error);
  };
};
