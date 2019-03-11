//******************************************
// DAY 2 PART 1: Inventory Management System
// https://adventofcode.com/2018/day/2
//******************************************

const fs = require('fs');

// Load the list of ids
const ids = fs.readFileSync('./input.txt', 'utf-8').split('\n');

// Find how many ids have two and three repeated characters
const occurenceCounts = ids.reduce(
  (acc, id) => {
    const charCounts = id.split('').reduce((acc, char) => {
      return Object.assign(acc, { [char]: (acc[char] || 0) + 1 });
    }, {});

    return {
      2: acc['2'] + (Object.values(charCounts).includes(2) ? 1 : 0),
      3: acc['3'] + (Object.values(charCounts).includes(3) ? 1 : 0)
    };
  },
  { 2: 0, 3: 0 }
);

// Multiply to calculate the checksum
const checksum = occurenceCounts['2'] * occurenceCounts['3'];

console.log('Checksum:', checksum); // Answer: 5434

//*************
// DAY 2 PART 2
//*************

let nearDuplicates;

// Find the duplicate id when one letter in the same position is removed
for (let i = 0; i < ids[0].length; i++) {
  const modifiedIds = ids.map(id => {
    return id.substring(0, i) + id.substring(i + 1);
  });

  nearDuplicates = modifiedIds.filter((modifiedId, index) => {
    return modifiedIds.indexOf(modifiedId) !== index;
  });

  if (nearDuplicates.length > 0) {
    break;
  }
}

console.log('Common Letters:', nearDuplicates[0]); // Answer: agimdjvlhedpsyoqfzuknpjwt
