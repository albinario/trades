import React, { Component } from 'react';
import moment from 'moment';
import GamesFeed from '../util/GamesFeed';
import Picks from '../util/Picks';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gamesHomeWeek1: 0,
      valueHomeWeek1: 0,
      gamesAwayWeek1: 0,
      valueAwayWeek1: 0,
      gamesHomeWeek2: 0,
      valueHomeWeek2: 0,
      gamesAwayWeek2: 0,
      valueAwayWeek2: 0,
      gamesHomeWeek3: 0,
      valueHomeWeek3: 0,
      gamesAwayWeek3: 0,
      valueAwayWeek3: 0,
      gamesHomeMonth: 0,
      valueHomeMonth: 0,
      gamesAwayMonth: 0,
      valueAwayMonth: 0
    }
    this.getValue = this.getValue.bind(this);
    this.cleanName = this.cleanName.bind(this);
    this.getLogo = this.getLogo.bind(this);
  }

  getValue(games) {
    let opponents = [];
    let value = 0;
    games.forEach(game => {
      if (game.games[0].teams.home.team.id !== this.props.team.id) {
        opponents.push(game.games[0].teams.home.team.id);
      } else {
        opponents.push(game.games[0].teams.away.team.id);
      }
    })
    opponents.forEach(opponent => {
      const opp = this.props.teams.filter(team => team.id === opponent);
      let rank = parseInt(opp[0].rank);
      value += rank;
    })
    return value;
  }

  cleanName(name) {
    let n = name.split(" ");
    return n[n.length-1];
  }

  getLogo(teamId) {
    if (teamId) {
      return 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/'+teamId+'.svg';
    }
  }

  componentDidMount() {
    this.setState({
      name: this.cleanName(this.props.team.name)
    })
    GamesFeed.getGames(this.props.team.id, moment().format("YYYY-MM-DD"), moment().add(6, 'days').format("YYYY-MM-DD")).then(games => {
      const gamesHome = games.games.filter(game => this.props.team.id === game.games[0].teams.home.team.id);
      const valueHome = this.getValue(gamesHome);
      const gamesAway = games.games.filter(game => this.props.team.id === game.games[0].teams.away.team.id);
      const valueAway = this.getValue(gamesAway);
      this.setState({
        gamesHomeWeek1: gamesHome.length,
        valueHomeWeek1: valueHome,
        gamesAwayWeek1: gamesAway.length,
        valueAwayWeek1: valueAway
      })
    })
    GamesFeed.getGames(this.props.team.id, moment().add(7, 'days').format("YYYY-MM-DD"), moment().add(13, 'days').format("YYYY-MM-DD")).then(games => {
      const gamesHome = games.games.filter(game => this.props.team.id === game.games[0].teams.home.team.id);
      const valueHome = this.getValue(gamesHome);
      const gamesAway = games.games.filter(game => this.props.team.id === game.games[0].teams.away.team.id);
      const valueAway = this.getValue(gamesAway);
      this.setState({
        gamesHomeWeek2: gamesHome.length,
        valueHomeWeek2: valueHome,
        gamesAwayWeek2: gamesAway.length,
        valueAwayWeek2: valueAway
      })
    })
    GamesFeed.getGames(this.props.team.id, moment().add(14, 'days').format("YYYY-MM-DD"), moment().add(20, 'days').format("YYYY-MM-DD")).then(games => {
      const gamesHome = games.games.filter(game => this.props.team.id === game.games[0].teams.home.team.id);
      const valueHome = this.getValue(gamesHome);
      const gamesAway = games.games.filter(game => this.props.team.id === game.games[0].teams.away.team.id);
      const valueAway = this.getValue(gamesAway);
      this.setState({
        gamesHomeWeek3: gamesHome.length,
        valueHomeWeek3: valueHome,
        gamesAwayWeek3: gamesAway.length,
        valueAwayWeek3: valueAway
      })
    })
    GamesFeed.getGames(this.props.team.id, moment().format("YYYY-MM-DD"), moment().add(1, 'months').format("YYYY-MM-DD")).then(games => {
      const gamesHome = games.games.filter(game => this.props.team.id === game.games[0].teams.home.team.id);
      const valueHome = this.getValue(gamesHome);
      const gamesAway = games.games.filter(game => this.props.team.id === game.games[0].teams.away.team.id);
      const valueAway = this.getValue(gamesAway);
      this.setState({
        gamesHomeMonth: gamesHome.length,
        valueHomeMonth: valueHome,
        gamesAwayMonth: gamesAway.length,
        valueAwayMonth: valueAway
      })
    })
  }

  render() {
    // console.log(`Team: render() ${this.props.team.rank} ${this.props.team.name} (${this.props.team.id})`);
    return (
      <div className="row">
        <div className="col-1 text-right">{this.props.team.rank} <span className="small">{this.props.team.rankLast10}</span></div>
        <div className="col-1 text-right"><span className="small">{this.props.team.rankHome} {this.props.team.rankAway} {this.props.team.streak}</span></div>
        <div className="col-2" style={{padding: "0 10px 0 0"}}><img src={this.getLogo(this.props.team.id)} alt="" /> {this.state.name} <span className="small">({this.props.team.wins}-{this.props.team.losses}-{this.props.team.ot}) {this.props.team.goalsScored}-{this.props.team.goalsAgainst}</span></div>
        <div className="col-1 text-center">{this.state.gamesHomeWeek1} <span className="small">{this.state.valueHomeWeek1}</span> {this.state.gamesAwayWeek1} <span className="small">{this.state.valueAwayWeek1}</span></div>
        <div className="col-1 text-center">{this.state.gamesHomeWeek2} <span className="small">{this.state.valueHomeWeek2}</span> {this.state.gamesAwayWeek2} <span className="small">{this.state.valueAwayWeek2}</span></div>
        <div className="col-1 text-center">{this.state.gamesHomeWeek3} <span className="small">{this.state.valueHomeWeek3}</span> {this.state.gamesAwayWeek3} <span className="small">{this.state.valueAwayWeek3}</span></div>
        <div className="col-1 text-center">{this.state.gamesHomeMonth} <span className="small">{this.state.valueHomeMonth}</span> {this.state.gamesAwayMonth} <span className="small">{this.state.valueAwayMonth}</span></div>
        <div className="col-1 text-right"><span className="small">{Picks.filter(p => p.picker === 'A' && p.team === this.props.team.id).map(p => p.jersey).join(', ')}</span> <img src={this.getLogo(this.props.team.id)} alt="" style={{padding: "0 0 0 20px"}} /></div>
        <div className="col-2"><span className="small">{Picks.filter(p => p.picker !== 'A' && p.team === this.props.team.id).map(p => p.picker+p.jersey).join(', ')}</span></div>
      </div>
    )
  }
}

export default Team;
