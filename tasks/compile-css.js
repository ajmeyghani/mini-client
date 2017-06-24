const sass = require('node-sass');
const fs = require('fs-extra');

module.exports = function(cssOpts, sassConfig, writeConfig) {
  return function() {
    var defaultSassConfig = {
      file: cssOpts.input,
      outFile: cssOpts.output,
      sourceMap: cssOpts.output.replace('.css', '.css.map'),
      includePaths: cssOpts.includes,
    };
    sassConfig = sassConfig || defaultSassConfig;

    sass.render(sassConfig, function(error, result) {
      if (!error) {
        fs.writeFile(cssOpts.output, result.css, function(err) {
          if (!err) {
            console.log('Done converting the SASS files.');
          }
        });
        fs.writeFile(cssOpts.output.replace('.css', '.css.map'), result.map, function(err) {
          if (!err) {
            console.log('Done writing the SASS map file.');
          }
        });
      } else {
        console.log(error);
      }
    });
  };
};
