const Functions = {
  getValue(teamId, games, allTeams) {
    let opponents = [];
    let value = 0;
    games.forEach(game => {
      if (game.games[0].teams.home.team.id !== teamId) {
        opponents.push(game.games[0].teams.home.team.id);
      } else {
        opponents.push(game.games[0].teams.away.team.id);
      }
    })
    opponents.forEach(opponent => {
      value += parseInt(allTeams.filter(team => team.id === opponent)[0].rank);
    })
    return value;
  },
  cleanName(name) {
    let n = name.split(" ");
    const teams = ['Columbus', 'Detroit', 'Toronto', 'Vegas'];
    if (teams.includes(n[0])) {
      return n[n.length-2]+' '+n[n.length-1];
    } else {
      return n[n.length-1];
    }
  },
  getLogo(teamId) {
    if (teamId) {
      return 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/'+teamId+'.svg';
    }
  }
}

export default Functions;
