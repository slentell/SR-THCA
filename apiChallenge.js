
  const rp = require("request-promise");
  const NHL_API_URL = "https://statsapi.web.nhl.com/api/v1";
  const NHL_PEOPLE_API_URL = "https://statsapi.web.nhl.com/api/v1/people";

  const getTeam = async (teamId) => {
    const options = {
      uri: `${NHL_API_URL}/teams/${teamId}`,
      json: true,
    };
    const team = await rp(options);
    const tData = {
    tID:team["teams"][0]["id"],
    tName:team["teams"][0]["name"],
    tVenue:team["teams"][0]["venue"]["name"],
    }
    return (tData);
  }
  const getTeamStats = async (teamId, seasonYear) => {
    const options = {
      uri: `${NHL_API_URL}/teams/${teamId}?expand=team.stats&season=${seasonYear}`,
      json: true,
    };
    const teamStats = await rp(options);
    const tStats = {
    gamesPlayed:teamStats["teams"][0]["teamStats"][0]["splits"][0]["stat"]["gamesPlayed"],
    wins:teamStats["teams"][0]["teamStats"][0]["splits"][0]["stat"]["wins"],
    losses:teamStats["teams"][0]["teamStats"][0]["splits"][0]["stat"]["losses"],
    points:teamStats["teams"][0]["teamStats"][0]["splits"][0]["stat"]["pts"],
    goalsPerGame:teamStats["teams"][0]["teamStats"][0]["splits"][0]["stat"]["goalsPerGame"],
    }
    return tStats;
  }
  const getTeamSchedule = async (teamId, seasonYear) => {
    const options = {
      uri: `${NHL_API_URL}/schedule?teamId=${teamId}&season=${seasonYear}`,
      json: true,
    };
    const teamSchedule = await rp(options);
    const tSchedule = {
    firstGameDate:teamSchedule["dates"][0]["date"],
    firstGameOpponent:teamSchedule["dates"][0]["games"][0]["teams"]["away"]["team"]["name"]
    }
    return tSchedule;
  }
  const createTeamCSV = (values, teamId, seasonYear) => {
    const fs = require('fs');
    const csvWriter = require('csv-write-stream');
    const writer = csvWriter();
    writer.pipe(fs.createWriteStream(`${teamId}_${seasonYear}.csv`));
    writer.write({
      teamId: values.tID,
      teamName: values.tName,
      teamVenue: values.tVenue,
      gamesPlayed: values.gamesPlayed,
      wins: values.wins,
      losses: values.losses,
      points: values.points,
      goalsPerGame: values.goalsPerGame,
      firstGameDate: values.firstGameDate,
      firstGameOpponent: values.firstGameOpponent
});
  }
  const teamPipeline = (teamId, seasonYear) => {
    try {
      Promise.all([getTeam(teamId), getTeamStats(teamId, seasonYear), getTeamSchedule(teamId, seasonYear)]).then((values) => {
        createTeamCSV(values.reduce(((r, o) => Object.assign(r, o)), {}), teamId, seasonYear);
      }
      );

    } catch (err) {
      console.log(err);
    }
  };

  const getPlayer = async (playerId, seasonYear) => {
    const options = {
      uri: `${NHL_PEOPLE_API_URL}/${playerId}?expand=person.stats&stats=statsSingleSeason&season=${seasonYear}`,
      json: true,
    };
    const player = await rp(options);
    if (player["people"][0]["rookie"] == false) {
      const pData = {
      pID:player["people"][0]["id"],
      pName:player["people"][0]["fullName"],
      pTeam: player["people"][0]["currentTeam"]["name"],
      pAge:player["people"][0]["currentAge"],
      pNumber:player["people"][0]["primaryNumber"],
      pPosition:player["people"][0]["primaryPosition"]["name"],
    }
    return pData;
    } else {
        const pData = {
        pID:player["people"][0]["id"],
        pName:player["people"][0]["fullName"],
        pTeam:player["people"][0]["currentTeam"]["name"],
        pAge:player["people"][0]["currentAge"],
        pNumber:player["people"][0]["primaryNumber"],
        pPosition:player["people"][0]["primaryPosition"]["name"],
        pAssists:player["people"][0]["stats"][0]["splits"][0]["stat"]["assists"],
        pGoals:player["people"][0]["stats"][0]["splits"][0]["stat"]["goals"],
        pGames:player["people"][0]["stats"][0]["splits"][0]["stat"]["games"],
        pHits:player["people"][0]["stats"][0]["splits"][0]["stat"]["hits"],
        pPoints:player["people"][0]["stats"][0]["splits"][0]["stat"]["points"],
        }
        return pData ;
    }

  }
  const writePlayerCSV = (values, playerId, seasonYear) => {
    const fs = require('fs');
    const csvWriter = require('csv-write-stream');
    const writer = csvWriter();
    writer.pipe(fs.createWriteStream(`${playerId}_${seasonYear}.csv`));
    writer.write({
      playerId: values.pID,
      playerName: values.pName,
      playerTeam: values.pTeam,
      playerAge: values.pAge,
      playerNumber: values.pNumber,
      playerPosition: values.pPosition,
      playerAssists: values.pAssists || "not a rookie",
      playerGoals: values.pGoals || "not a rookie",
      playerGames: values.pGames  || "not a rookie",
      playerHits: values.pHits  || "not a rookie",
      playerPoints: values.pPoints || "not a rookie",
});
  }
  const playerPipeline = (playerId, seasonYear) => {
    try {
      Promise.all([getPlayer(playerId, seasonYear)]).then((values) => {
        writePlayerCSV(values.reduce(((r, o) => Object.assign(r, o)), {}), playerId, seasonYear);
      }
      );

  } catch (err) { 
    console.log(err);
  }
  };

  module.exports = {
    getTeam,
    getTeamStats,
    getTeamSchedule,
    createTeamCSV,
    teamPipeline,
    getPlayer,
    writePlayerCSV,
    playerPipeline,
  };
 


teamPipeline(1, 20192020);
playerPipeline(8471675, 20192020);






