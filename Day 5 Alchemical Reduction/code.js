//************************************
// DAY 5 PART 1: Alchemical Reduction
// https://adventofcode.com/2018/day/5
//************************************

const fs = require('fs');

// Load the polymer string
const polymer = fs.readFileSync('./input.txt', 'utf-8');

// Keep traversing the polymer and removing reacted units until there are no more reactions
const reactPolymer = polymer => {
  const reactedPolymer = polymer.slice().split('');
  let reactionCount;

  do {
    reactionCount = 0;

    for (let i = 0; i < reactedPolymer.length - 1; i++) {
      if (
        Math.abs(
          reactedPolymer[i].charCodeAt(0) - reactedPolymer[i + 1].charCodeAt(0)
        ) === 32
      ) {
        reactedPolymer.splice(i, 2);
        reactionCount += 1;
      }
    }
  } while (reactionCount > 0);

  return reactedPolymer;
};

console.log('Remaining polymer units:', reactPolymer(polymer).length); // Answer: 10132

//*************
// DAY 5 PART 2
//*************

let minReactedPolymerLength = polymer.length;

// Find the minimum reacted polymer length after removing all instances of each unit type
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(unitType => {
  const regex = new RegExp(unitType, 'gi');
  const modifiedPolymer = polymer.replace(regex, '');
  const reactedPolymer = reactPolymer(modifiedPolymer);

  if (reactedPolymer.length < minReactedPolymerLength) {
    minReactedPolymerLength = reactedPolymer.length;
  }
});

console.log('Length of the shortest reacted polymer:', minReactedPolymerLength); // Answer: 4572
