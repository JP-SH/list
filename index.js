#!/usr/bin/env node

const fs = require('fs');

// the reason we dont require 'process.cwd' is because the process module is one of the only modules automatically added to the global scope of every project.
fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.log(err);
  }

  console.log(filenames);
});
