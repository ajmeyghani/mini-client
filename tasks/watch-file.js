"use strict";
const fs = require('fs');
const rollup = require('rollup');

let onceCount = 0; //window$ workaround

fs.watch('src', { persistent: true, interval: 20000 }, (event, filename) => {

    if (filename && event == 'change' && onceCount % 2 == 0) {
        console.log(new Date().toISOString() + ": file " , filename, "changed.");
        rollup.rollup({entry: 'src/main.js'}).then( function (bundle) {
            bundle.write({  format: 'iife', dest: './app.js'});
        });
    }
    onceCount++;
});
