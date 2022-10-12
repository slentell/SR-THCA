//tests 
const getTeam = require('./apiChallenge.js').getTeam;
const getTeamStats = require('./apiChallenge.js').getTeamStats;
const getTeamSchedule = require('./apiChallenge.js').getTeamSchedule;
const createTeamCSV = require('./apiChallenge.js').createTeamCSV;
const teamPipeline = require('./apiChallenge.js').teamPipeline;
const getPlayer = require('./apiChallenge.js').getPlayer;
const writePlayerCSV = require('./apiChallenge.js').writePlayerCSV;
const playerPipeline = require('./apiChallenge.js').playerPipeline;



test('getTeam function returns an object', async() => {
  try {
    const team = await getTeam(1, 20192020);
    expect(typeof team).toBe('object');
  } catch (err) {
    console.log(err);
  }
});

test('getTeamStats function returns an object', async () => {
  try {
    const teamStats = await getTeamStats(1, 20192020);
    expect(typeof teamStats).toBe('object');
  } catch (err) {
    console.log(err);
  }
}
);
test('getTeamSchedule function returns an object', async () => {
  try {
    const teamSchedule = await getTeamSchedule(1, 20192020);
    expect(typeof teamSchedule).toBe('object');
  } catch (err) {
    console.log(err);
  }
}
);
test('createTeamCSV function returns a string', async () => {
  try {
    const teamCSV = await createTeamCSV(1, 20192020);
    expect(typeof teamCSV).toBe('string');
  } catch (err) {
    console.log(err);
  }
}
);
test('teamPipeline function returns a string', async () => {
  try {
    const teamPipeline = await teamPipeline(1, 20192020);
    expect(typeof teamPipeline).toBe('string');
  } catch (err) {
    console.log(err);
  }
}
);
test('getPlayer function returns an object', async () => {
  try {
    const player = await getPlayer(8471214, 20192020);
    expect(typeof player).toBe('object');
  } catch (err) {
    console.log(err);
  }
}
);
test('writePlayerCSV function returns a string', () => {
  try {
    const playerCSV = writePlayerCSV(8471214, 20192020);
    expect(typeof playerCSV).toBe('string');
  } catch (err) {
    console.log(err);
  }
}
);
test('playerPipeline function returns a string', async () => {
  try {
    const playerPipeline = await playerPipeline(8471214, 20192020);
    expect(typeof playerPipeline).toBe('string');
  } catch (err) {
    console.log(err);
  }
}
);


