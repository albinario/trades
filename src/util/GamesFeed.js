import Connect from './Connect';

const GamesFeed = {
  getGames(teamId, startDate, endDate) {
    return Connect.gamesAPI(teamId, startDate, endDate).then(jsonResponse => {
      if (jsonResponse) {
        const games = jsonResponse.dates.filter(game => game.games[0].status.detailedState !== "Postponed");
        const gamesPostponed = jsonResponse.dates.filter(game => game.games[0].status.detailedState === "Postponed");
        const gamesHome = games.filter(game => teamId === game.games[0].teams.home.team.id);
        const gamesAway = games.filter(game => teamId === game.games[0].teams.away.team.id);
        return {
          gamesHome: gamesHome,
          gamesAway: gamesAway,
          postponed: gamesPostponed.length
        }
      }
    }).catch(err => {
      console.log(err);
    })
  }
}

export default GamesFeed;
