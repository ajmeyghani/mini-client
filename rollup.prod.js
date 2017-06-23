import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import config from './rollup.dev';

config.dest = 'dist/js/main.min.js';
config.plugins[2] = replace({ 'process.env.NODE_ENV': JSON.stringify('production') });
config.plugins.push(uglify());

export default config;
