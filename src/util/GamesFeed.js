import Connect from './Connect';

const GamesFeed = {
  getGames(team, startDate, endDate) {
    return Connect.gamesAPI(team, startDate, endDate).then(jsonResponse => {
      if (jsonResponse) {
        return {
          games: jsonResponse.dates
        }
      }
    }).catch(err => {
      console.log(err);
    })
  }
}

export default GamesFeed;
