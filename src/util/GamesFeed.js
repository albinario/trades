import Connect from './Connect';
import Config from './Config';

const GamesFeed = {
	getGames(teamId, startDate, endDate) {
		return Connect.gamesAPI(teamId, startDate, endDate).then(jsonResponse => {
			if (jsonResponse) {
				return jsonResponse.dates.filter(game => game.games[0].gameType === Config.gameType);
			}
		}).catch(err => {
			console.log(err);
		})
	}
}

export default GamesFeed;