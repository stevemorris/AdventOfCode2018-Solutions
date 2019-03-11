//************************************
// DAY 1 PART 1: Chronal Calibration
// https://adventofcode.com/2018/day/1
//************************************

const fs = require('fs');

// Load the list of frequencies
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map(Number);

// Sum the frequencies
let sum = values.reduce((acc, value) => {
  return acc + value;
}, 0);

console.log('Resulting Frequency:', sum); // Answer: 595

//*************
// DAY 1 PART 2
//*************

let data = {
  sum: 0,
  uniques: new Set([0]),
  firstRepeat: null
};

// Find the first summed frequency reached twice, repeating the list until found
while (data.firstRepeat === null) {
  data = values.reduce((data, value) => {
    const newSum = data.sum + value;
    let firstRepeat = data.firstRepeat;

    if (firstRepeat === null && data.uniques.has(newSum)) {
      firstRepeat = newSum;
    }

    return {
      sum: newSum,
      uniques: data.uniques.add(newSum),
      firstRepeat
    };
  }, data);
}

console.log('First Repeat Frequency:', data.firstRepeat); // Answer: 80598
