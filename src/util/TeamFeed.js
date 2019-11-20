import Connect from './Connect';

const TeamFeed = {
  getTeams() {
    return Connect.teamsAPI().then(jsonResponse => {
      return jsonResponse.records[0].teamRecords.map(team => {
        return {
          id: team.team.id,
          name: team.team.name,
          rank: team.leagueRank,
          rankLast10: team.leagueL10Rank,
          rankHome: team.leagueHomeRank,
          rankAway: team.leagueRoadRank,
          streak: team.streak.streakCode,
          wins: team.leagueRecord.wins,
          losses: team.leagueRecord.losses,
          ot: team.leagueRecord.ot,
          goalsScored: team.goalsScored,
          goalsAgainst: team.goalsAgainst
        }
      })
    }).catch(err => {
      console.log(err);
    })
  }
}

export default TeamFeed;
