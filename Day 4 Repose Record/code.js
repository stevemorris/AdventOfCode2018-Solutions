//************************************
// DAY 4 PART 1: Repose Record
// https://adventofcode.com/2018/day/4
//************************************

const fs = require('fs');

// Load the list of events sorted chronologically
const events = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .sort();

let guardId, sleepRecord, startMinute, endMinute;

// Parse the events and build a totaled sleep record by minute for each guard
const guardSleepRecords = events.reduce((acc, event) => {
  switch (event.slice(19, 24)) {
    case 'Guard':
      guardId = event.match(/Guard #(\d+)/)[1];
      sleepRecord =
        acc[guardId] === undefined
          ? { [guardId]: [...Array(60)].fill(0) }
          : { [guardId]: Object.assign(acc[guardId]) };
      return acc;

    case 'falls':
      startMinute = parseInt(event.slice(15, 17), 10);
      return acc;

    case 'wakes':
      endMinute = parseInt(event.slice(15, 17), 10) - 1;
      for (let minute = startMinute; minute <= endMinute; minute++) {
        sleepRecord[guardId][minute] += 1;
      }
      return { ...acc, ...sleepRecord };

    default:
      return acc;
  }
}, {});

let maxSleepGuardId,
  maxSleepMinutes = 0;

// Find the guard who slept the most minutes overall
for (let guardId in guardSleepRecords) {
  const guardSleepRecord = guardSleepRecords[guardId];
  const guardSleepMinutes = guardSleepRecord.reduce(
    (acc, value) => acc + value,
    0
  );

  if (guardSleepMinutes > maxSleepMinutes) {
    maxSleepGuardId = guardId;
    maxSleepMinutes = guardSleepMinutes;
  }
}

// Find the peak minute that guard was asleep the most
const guardSleepRecord = guardSleepRecords[maxSleepGuardId];
const guardPeakMinute = guardSleepRecord.indexOf(Math.max(...guardSleepRecord));

console.log('Strategy 1 Result:', maxSleepGuardId * guardPeakMinute); // Answer: 118599

//*************
// DAY 4 PART 2
//*************

let peakGuardId,
  peakMinute,
  peakSleepMinutes = 0;

// Find the guard who slept the most on the same minute, and that peak minute
for (let guardId in guardSleepRecords) {
  const guardSleepRecord = guardSleepRecords[guardId];
  const guardPeakSleepMinutes = Math.max(...guardSleepRecord);

  if (guardPeakSleepMinutes > peakSleepMinutes) {
    peakGuardId = guardId;
    peakMinute = guardSleepRecord.indexOf(guardPeakSleepMinutes);
    peakSleepMinutes = guardPeakSleepMinutes;
  }
}

console.log('Strategy 2 Result:', peakGuardId * peakMinute); // Answer: 33949
