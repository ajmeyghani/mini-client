const jsOpts = {
  input: path.join('js/main.js'),
  output: path.join(`${devDist}/js/main.js`),
};
var cache;
const gazeJs = new Gaze('js/**/*.js');
gazeJs.on('all', (event, filepath) => {
  rollup.rollup({
      entry: jsOpts.input,
      cache: cache,
      plugins: [
        buble()
      ],
    })
    .then(bundle => {
      cache = bundle;
      bundle.write({
        format: 'iife',
        sourceMap: true,
        dest: jsOpts.output
      });
    })
    .then(() => console.log('Output js file'))
    .catch(console.error);
});
