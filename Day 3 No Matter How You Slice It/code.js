//*****************************************
// DAY 3 PART 1: No Matter How You Slice It
// https://adventofcode.com/2018/day/3
//*****************************************

const fs = require('fs');

// Load the list of claims
const claims = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map(claim => {
    const [, id, xOrigin, yOrigin, width, height] = claim.match(
      /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/
    );

    return {
      id,
      xOrigin: parseInt(xOrigin),
      yOrigin: parseInt(yOrigin),
      width: parseInt(width),
      height: parseInt(height)
    };
  });

// Build a two-dimensional map of the fabric, with claim overlaps marked by 'X'
const fabricMap = claims.reduce((acc, claim) => {
  const { id, xOrigin, yOrigin, width, height } = claim;

  for (let row = yOrigin; row < yOrigin + height; row++) {
    if (acc[row] === undefined) {
      acc[row] = [];
    }

    for (let col = xOrigin; col < xOrigin + width; col++) {
      acc[row][col] = acc[row][col] === undefined ? id : 'X';
    }
  }

  return acc;
}, []);

// Count the claim overlaps in the fabric map
const overlapCount = fabricMap.reduce((acc, fabricRow) => {
  return acc + fabricRow.filter(square => square === 'X').length;
}, 0);

console.log('Square inches of overlapped fabric:', overlapCount); // Answer: 110383

//*************
// DAY 3 PART 2
//*************

// Find the intact claim with no X's in the fabric map
const intactClaim = claims.find(claim => {
  const { xOrigin, yOrigin, width, height } = claim;

  for (let row = yOrigin; row < yOrigin + height; row++) {
    for (let col = xOrigin; col < xOrigin + width; col++) {
      if (fabricMap[row][col] === 'X') {
        return false;
      }
    }
  }

  return true;
});

console.log('ID of intact claim:', intactClaim.id); // Answer: 129
