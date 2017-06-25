const sass = require('node-sass');
const fs = require('fs-extra');
const Promise = require('bluebird');

module.exports = function(cssOpts, sassConfig, writeConfig) {
  return function() {
    var defaultSassConfig = {
      file: cssOpts.input,
      outFile: cssOpts.output,
      sourceMap: cssOpts.output.replace('.css', '.css.map'),
      includePaths: cssOpts.includes,
      outputStyle: cssOpts.outputStyle,
    };
    sassConfig = sassConfig || defaultSassConfig;

    sass.render(sassConfig, (error, result) => {
      if (!error) {
        Promise.all([
            fs.writeFile(cssOpts.output, result.css),
            fs.writeFile(cssOpts.output.replace('.css', '.css.map'), result.map)
          ])
        .then(() => console.log('Finished writing the css file.'))
        .catch(console.error);
      } else {
        console.log(error);
      }
    });
  };
};
