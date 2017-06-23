const path = require('path');
const glob = require('glob');
const {isRoot} = require('./lib/utils');
/* this will go through all the scss files in the dev folder.
  goal: no worry about where the entry points are, or just define
  it once? so you dont have to worry about the names or where they are.
  maybe in a config file declaration or by globbing patterns.
*/
glob('css/**/*.scss', (e, files) => console.log(files));
/* isRoot will tell you if running the task from the root of the project */
isRoot().then(fromRoo => fromRoo)
.then(d => console.log(d));
