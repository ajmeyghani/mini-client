const rollup = require('rollup');
const buble = require('rollup-plugin-buble');

module.exports = function(jsConfig, rollupConfig, writeConfig) {
  return function() {
    var cache;
    var defaultRollupConfig = {
      entry: jsConfig.input,
      cache: cache,
      plugins: [
        buble()
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
