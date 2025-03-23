#!/usr/bin/env node

const fs = require('fs');

// the reason we dont require 'process.cwd' is because the process module is one of the only modules automatically added to the global scope of every project.
fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.log(err);
  }

  // how to get items in the highlighted to show what they are such as a file or folder

  //  A BAD WAY TO WRITE IT WOULD BE
  // for (let filename of filenames) {
  //   fs.lstat(filename, (err, stats) => {
  //     if (err) {
  //       console.log(err);
  //     }

  //     console.log(filename, stats.isFile());
  //   });
  // }

  // optional solution
  const allStats = Array(filenames.length).fill(null);
    for (let filename of filenames) {
      const index = filenames.indexOf(filename);
    fs.lstat(filename, (err, stats) => {
      if (err) {
        console.log(err);
      }

      allStats[index] = stats;

      const ready = allStats.every((stats) => {
        return stats;
      });

      if (ready) {
        allStats.forEach((stats, index) => {
          console.log(filenames[index], stats.isFile());
        });
      }
    });
  }
});
