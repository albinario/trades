import Connect from './Connect';

const GamesFeed = {
  getGames(teamId, startDate, endDate) {
    return Connect.gamesAPI(teamId, startDate, endDate).then(jsonResponse => {
      if (jsonResponse) {
        return jsonResponse.dates;
      }
    }).catch(err => {
      console.log(err);
    })
  }
}

export default GamesFeed;
