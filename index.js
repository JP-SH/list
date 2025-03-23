#!/usr/bin/env node

const fs = require('fs');
// chalk is a node library that we can use to highlight the different content based on what it is
const chalk = require('chalk');

// this is needed for argv. To be able to read out contents from anywhere specified not just the current directory
const path = require('path');

// these next 2 lines are for optional #2
// const util = require('util');

// const lstat = util.promisfy(fs.lstat)

// the reason we dont require 'process.cwd' is because the process module is one of the only modules automatically added to the global scope of every project.
// fs.readdir(process.cwd(), (err, filenames) => {
//   if (err) {
//     console.log(err);
//   }

//   // how to get items in the highlighted to show what they are such as a file or folder

//    A BAD WAY TO WRITE IT WOULD BE
//   for (let filename of filenames) {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         console.log(err);
//       }

//       console.log(filename, stats.isFile());
//     });
//   }
// });

// fs.readdir(process.cwd(), (err, filenames) => {
//   if (err) {
//     console.log(err);
//   }
//    // optional solution
//    const allStats = Array(filenames.length).fill(null);
//    for (let filename of filenames) {
//      const index = filenames.indexOf(filename);
//    fs.lstat(filename, (err, stats) => {
//      if (err) {
//        console.log(err);
//      }

//      allStats[index] = stats;

//      const ready = allStats.every((stats) => {
//        return stats;
//      });

//      if (ready) {
//        allStats.forEach((stats, index) => {
//          console.log(filenames[index], stats.isFile());
//        });
//      }
//    });
//  }

// best way to list all contents and higlight different things based on what they are such as a file or folder


// fs.readdir(process.cwd(), (err, filenames) => {
//   if (err) {
//     console.log(err);
//   }

// });

// optional #1
// a way to wrap it in a promise so it returns the contents and what kinds of thing it is once its all complete
// const lstat = filename => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };

// Method #3
// const { lstat } = fs.promises;

// fs.readdir(process.cwd(), async (err, filenames) => {
//   if (err) {
//     console.log(err);
//   }

//   for (let filename of filenames) {
//     try {
//     const stats = await lstat(filename);

//     console.log(filename, stats.isFile())
//   } catch (err) {
//     console.log(err);
//   }
//  }
// });

// best method
const { lstat } = fs.promises;

// argv has some information about how our program was executed. It creates an array with 2 elements and if something was entered such as where to read out files from it will be the 3rd element
const targetDir = process.argv[2] || process.cwd();


fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = filenames.map(filename => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(filenames[index]);
    } {
      console.log(chalk.magenta(filenames[index]));
    }
  }
});
