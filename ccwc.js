#!/usr/bin/env node
import fs from 'fs';


/*
  O/P of args:
  0 => location of nodejs
  and rest is the strings of all commands i.e
  ccwc -c test.txt (command)
  So, this command will get segregated to individual strings
  for eg:
  [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Rahul\\AppData\\Roaming\\npm\\node_modules\\ccwc\\ccwc.js',
  '-c',
  'test.txt'
  ]
*/


// command: ccwc -c test.txt

function printUsage(){
  console.log('Command: ccwc -c fileName');
  console.log('Command: ccwc -l fileName');
  console.log('Command: ccwc -w fileName');
  console.log('Command: ccwc -m fileName');
  console.log('Command: ccwc fileName');
  console.log('Command: cat test.txt | ccwc -l');
}

function byteSize_file(data){
  let byteSize = Buffer.byteLength(data, 'utf8');
  return byteSize;
}

function totalLines_file(data){
  // counts number of lines in file
  let lines = data.split('\n');
  if(data.endsWith('\n')){
    lines = lines.slice(0, -1);
  }
  let linesCount = lines.length;
  // console.log(`${linesCount} ${fileName}`)
  return linesCount;
}

function totalWords_file(data){
  // counts number of words in file
  let lines = data.split('\n');
  let countWords = 0;
  lines.forEach((line) => {
    let trimmedLine = line.trim();
    // IMP: Skipping the empty lines in the file
    if(trimmedLine){
      const words = trimmedLine.split(/\s+/); // /\s+/ => regular expression 
      countWords += words.length;
    }
  })
  // console.log(`${countWords} ${fileName}`);
  return countWords;
}

// Step Four
function totalCharacters_file(data){
  // console.log(`${data.length} ${fileName}`);
  return data.length;
}

function UNIX_file_operation(){
  // argv => argument vector in js
  const args = process.argv;
  console.log(args);
  if(args.length === 4){
    const fileName = args[3];
    const option = args[2];
    fs.readFile(fileName, 'utf8', (error, data) => {
      if(error){
        console.log(`Error Reading File: ${error.message}`);
        printUsage();
        process.exit(1); // stops the program
      }
      if(args[2] === '-c'){
        // const fileName = args[3]; // fileName is stored in 2nd index in vector
        const ans = byteSize_file(data);
        console.log(`${ans} ${fileName}`);
      }
      else if(args[2] === '-l'){
        // const fileName = args[3]; // fileName is stored in 2nd index in vector
        const ans = totalLines_file(data);
        console.log(`${ans} ${fileName}`);
      }
      else if(args[2] === '-w'){
        // const fileName = args[3]; // fileName is stored in 2nd index in vector
        const ans = totalWords_file(data);
        console.log(`${ans} ${fileName}`);
      }
      else if(args[2] === '-m'){
        // const fileName = args[3]; // fileName is stored in 2nd index in vector
        const ans = totalCharacters_file(data);
        console.log(`${ans} ${fileName}`);
      }
    });
  }
  else if(args.length === 3){
    const fileName = args[2];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if(err){
        console.log(`Error Reading file: ${err.message}`);
        printUsage();
        process.exit(1);
      }else{
        const ans1 = byteSize_file(data);   // -c
        const ans2 = totalLines_file(data); // -l
        const ans3 = totalWords_file(data); // -w 
        console.log(`${ans2} ${ans3} ${ans1} ${fileName}`);
      }
    })
  }
  else if(args.length === 6){
    const fileName = args[2];
    const options = args[5];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if(err){
        console.log(`Error Reading File: ${err.message}`);
        printUsage();
        process.exit(1);
      }
      else{
        switch(options){
          case '-c':
            console.log(`${byteSize_file(data)} ${fileName}`);
            break;
          case '-l':
            console.log(`${totalLines_file(data)} ${fileName}`);
            break;
          case '-w':
            console.log(`${totalWords_file(data)} ${fileName}`);
            break;
          case '-m':
            console.log(`${totalCharacters_file(data)} ${fileName}`);
            break;
          default:
            console.log('Wrong options selected');
            printUsage();
        }
      }
    });
  }
}

UNIX_file_operation();

// else if(args[1] == 'cat' && args[5] == '-l'){
//       const ans = totalLines_file(data);
//       console.log(ans);
//     }


// cc-challenge-1: https://codingchallenges.fyi/challenges/challenge-wc