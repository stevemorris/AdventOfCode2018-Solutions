//************************************
// DAY 6 PART 1: Chronal Coordinates
// https://adventofcode.com/2018/day/6
//************************************

const fs = require('fs');

// Load the list of coordinates into x and y arrays
const coordinates = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const xCoordinates = [],
  yCoordinates = [];

coordinates.forEach(coordinate => {
  const [x, y] = coordinate.split(', ');
  xCoordinates.push(parseInt(x));
  yCoordinates.push(parseInt(y));
});

// Create a grid large enough to encompass the coordinates
const gridWidth = Math.max(...xCoordinates) + 1;
const gridHeight = Math.max(...yCoordinates) + 1;
const grid = [...Array(gridWidth)].map(() => [...Array(gridHeight)]);

// Populate each location in the grid with the closest coordinate Id and the distance to it
for (let id = 0; id < xCoordinates.length; id++) {
  const xCoordinate = xCoordinates[id];
  const yCoordinate = yCoordinates[id];
  const xDistances = [...Array(gridWidth)].map((_, xLocation) =>
    Math.abs(xCoordinate - xLocation)
  );
  const yDistances = [...Array(gridHeight)].map((_, yLocation) =>
    Math.abs(yCoordinate - yLocation)
  );

  for (let xLocation = 0; xLocation < gridWidth; xLocation++) {
    grid[xLocation] = grid[xLocation].map((gridLocationData, yLocation) => {
      const coordinateId = id;
      const coordinateDistance = xDistances[xLocation] + yDistances[yLocation];

      if (
        gridLocationData === undefined ||
        coordinateDistance < gridLocationData.coordinateDistance
      ) {
        return { coordinateId, coordinateDistance };
      }

      if (coordinateDistance === gridLocationData.coordinateDistance) {
        // Location is equally far from two of more coordinates
        return { coordinateId: -1, coordinateDistance };
      }

      return gridLocationData;
    });
  }
}

// Get the coordinates that border the edge of the grid and therefore have infinite area
const infiniteCoordinateIds = new Set([
  ...grid.map(gridCol => gridCol[0].coordinateId), // Top edge
  ...grid[gridWidth - 1].map(gridItem => gridItem.coordinateId), // Right edge
  ...grid.map(gridCol => gridCol[gridHeight - 1].coordinateId), // Bottom edge
  ...grid[0].map(gridItem => gridItem.coordinateId) // Left edge
]);

// Get the remaining coordinates which are finite
const finiteCoordinateIds = new Set(
  [...Array(xCoordinates.length)]
    .map((_, id) => id)
    .filter(coordinateId => !infiniteCoordinateIds.has(coordinateId))
);

// Calculate the area size for each finite coordinate
let finiteCoordinateAreaSizes = [...finiteCoordinateIds].reduce(
  (acc, coordinateId) => {
    return Object.assign(acc, { [coordinateId]: 0 });
  },
  {}
);

for (let xLocation = 0; xLocation < gridWidth; xLocation++) {
  for (let yLocation = 0; yLocation < gridHeight; yLocation++) {
    const gridLocationData = grid[xLocation][yLocation];

    if (finiteCoordinateIds.has(gridLocationData.coordinateId)) {
      finiteCoordinateAreaSizes[gridLocationData.coordinateId] += 1;
    }
  }
}

console.log(
  'Size of the largest finite area:',
  Math.max(...Object.values(finiteCoordinateAreaSizes))
); // Answer: 4398

//*************
// DAY 6 PART 2
//*************

// Create a new grid and populate each location with the sum of the distances to all coordinates
const grid2 = [...Array(gridWidth)].map(() => [...Array(gridHeight)].fill(0));

for (let id = 0; id < xCoordinates.length; id++) {
  const xCoordinate = xCoordinates[id];
  const yCoordinate = yCoordinates[id];
  const xDistances = [...Array(gridWidth)].map((_, xLocation) =>
    Math.abs(xCoordinate - xLocation)
  );
  const yDistances = [...Array(gridHeight)].map((_, yLocation) =>
    Math.abs(yCoordinate - yLocation)
  );

  for (let xLocation = 0; xLocation < gridWidth; xLocation++) {
    grid2[xLocation] = grid2[xLocation].map((coordinateDistance, yLocation) => {
      return (
        coordinateDistance + (xDistances[xLocation] + yDistances[yLocation])
      );
    });
  }
}

// Calculate the size of the area containing locations with a total distance to all coordinates of less than 10000
let safeAreaSize = 0;

for (let xLocation = 0; xLocation < gridWidth; xLocation++) {
  for (let yLocation = 0; yLocation < gridHeight; yLocation++) {
    const distanceToAllCoordinates = grid2[xLocation][yLocation];

    if (distanceToAllCoordinates < 10000) {
      safeAreaSize += 1;
    }
  }
}

console.log('Size of the safe region:', safeAreaSize); // Answer: 39560
