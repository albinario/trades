import Config from './Config';

const Connect = {
	gamesAPI(teamId, startDate, endDate) {
		return fetch(`${Config.apiUrl}schedule?teamId=${teamId}&startDate=${startDate}&endDate=${endDate}`).then(response => {
			return response.json();
		})
	},
	teamsAPI() {
		return fetch(`${Config.apiUrl}standings/byLeague`).then(response => {
			return response.json();
		})
	}
}

export default Connect;