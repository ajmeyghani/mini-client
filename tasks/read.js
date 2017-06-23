const glob = require('glob');
/* this will go through all the scss files in the dev folder.
  goal: no worry about where the entry points are, or just define
  it once? so you dont have to worry about the names or where they are.
  maybe in a config file declaration or by globbing patterns.
*/
glob('dev/**/*.scss', (e, files) => console.log(files));
