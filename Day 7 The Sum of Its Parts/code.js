//************************************
// DAY 7 PART 1: The Sum of Its Parts
// https://adventofcode.com/2018/day/7
//************************************

const fs = require('fs');

// Load the list of instructions
const instructions = fs.readFileSync('./input.txt', 'utf-8').split('\n');

// Build the child to parent step dependencies
const stepDependencies = instructions.reduce((obj, step) => {
  const [, parent, child] = step.match(
    /Step (\w) must be finished before step (\w) can begin/
  );

  obj[parent] = obj[parent] || [];
  obj[child] = obj[child] || [];
  obj[child].push(parent);
  return obj;
}, {});

const totalStepCount = Object.keys(stepDependencies).length;
let completedSteps = [];

// Determine the order to complete the steps
while (totalStepCount > completedSteps.length) {
  const availableSteps = [];

  // Determine the currently available next steps
  for (let step in stepDependencies) {
    if (!completedSteps.includes(step)) {
      const areParentsCompleted = stepDependencies[step].every(parent => {
        return completedSteps.includes(parent);
      });

      if (areParentsCompleted) {
        availableSteps.push(step);
      }
    }
  }

  // Add the correct available step to the completed steps
  completedSteps.push(availableSteps.sort().shift());
}

console.log('Order the steps should be completed:', completedSteps.join('')); // Answer: BHRTWCYSELPUVZAOIJKGMFQDXN

//*************
// DAY 7 PART 2
//*************

completedSteps = [];
const inProgressSteps = [];
let totalSeconds = 0;

// Determine how many seconds five workers will take to complete the steps
while (totalStepCount > completedSteps.length) {
  const availableSteps = [];

  // Determine the currently available next steps
  for (let step in stepDependencies) {
    if (!completedSteps.includes(step)) {
      const areParentsCompleted = stepDependencies[step].every(parent => {
        return completedSteps.includes(parent);
      });

      const isInProgress = inProgressSteps.some(inProgressStep => {
        return inProgressStep.step === step;
      });

      if (areParentsCompleted && !isInProgress) {
        availableSteps.push(step);
      }
    }
  }

  // Start work on the correct available steps if workers are available
  while (availableSteps.length > 0 && inProgressSteps.length < 5) {
    const nextStep = availableSteps.sort().shift();

    inProgressSteps.push({
      step: nextStep,
      remainingTime: nextStep.charCodeAt(0) - 4
    });
  }

  // Advance the clock
  totalSeconds += 1;

  // Check if work has completed on any of the in progress steps
  for (let i = inProgressSteps.length - 1; i >= 0; i--) {
    inProgressSteps[i].remainingTime -= 1;

    if (inProgressSteps[i].remainingTime === 0) {
      completedSteps.push(inProgressSteps[i].step);
      inProgressSteps.splice(i, 1);
    }
  }
}

console.log('Time in seconds to complete all the steps:', totalSeconds); // Answer: 959
