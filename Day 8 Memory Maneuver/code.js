//************************************
// DAY 8 PART 1: Memory Maneuver
// https://adventofcode.com/2018/day/8
//************************************

const fs = require('fs');

// Load the license data
const licenseData = fs.readFileSync('./input.txt', 'utf-8').split(' ');

// Read the license data and recursively add nodes to the tree
const addNode = (parent, licenseIndex) => {
  const node = {
    children: [],
    metadata: []
  };

  parent.push(node);

  const childCount = parseInt(licenseData[licenseIndex++]);
  const metadataCount = parseInt(licenseData[licenseIndex++]);

  for (let i = 0; i < childCount; i++) {
    licenseIndex = addNode(node.children, licenseIndex);
  }

  for (let i = 0; i < metadataCount; i++) {
    node.metadata.push(licenseData[licenseIndex++]);
  }

  return licenseIndex;
};

// Recursively sum the metadata entries in the tree
const sumMetadata = (node, total) => {
  total = node.metadata.reduce((acc, metadataEntry) => {
    return acc + parseInt(metadataEntry);
  }, total);

  for (let i = 0; i < node.children.length; i++) {
    total = sumMetadata(node.children[i], total);
  }

  return total;
};

const tree = [];

addNode(tree, 0);

console.log('Sum of all the metadata entries:', sumMetadata(tree[0], 0)); // Answer: 43825
