import React, { Component } from 'react';
import moment from 'moment';
import GamesFeed from '../util/GamesFeed';
import Picks from '../util/Picks';
import Period from './Period';

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
      valueAwayMonth: 0,
      postponedWeek1: 0,
      postponedWeek2: 0,
      postponedWeek3: 0,
      postponedMonth: 0
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
    if (n[0] === 'Columbus' || n[0] === 'Detroit' || n[0] === 'Toronto' || n[0] === 'Vegas') {
      return n[n.length-2]+' '+n[n.length-1];
    } else {
      return n[n.length-1];
    }
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
      this.setState({
        gamesHomeWeek1: games.gamesHome.length,
        valueHomeWeek1: this.getValue(games.gamesHome),
        gamesAwayWeek1: games.gamesAway.length,
        valueAwayWeek1: this.getValue(games.gamesAway),
        postponedWeek1: games.postponed
      })
    })
    GamesFeed.getGames(this.props.team.id, moment().add(7, 'days').format("YYYY-MM-DD"), moment().add(13, 'days').format("YYYY-MM-DD")).then(games => {
      this.setState({
        gamesHomeWeek2: games.gamesHome.length,
        valueHomeWeek2: this.getValue(games.gamesHome),
        gamesAwayWeek2: games.gamesAway.length,
        valueAwayWeek2: this.getValue(games.gamesAway),
        postponedWeek2: games.postponed
      })
    })
    GamesFeed.getGames(this.props.team.id, moment().add(14, 'days').format("YYYY-MM-DD"), moment().add(20, 'days').format("YYYY-MM-DD")).then(games => {
      this.setState({
        gamesHomeWeek3: games.gamesHome.length,
        valueHomeWeek3: this.getValue(games.gamesHome),
        gamesAwayWeek3: games.gamesAway.length,
        valueAwayWeek3: this.getValue(games.gamesAway),
        postponedWeek3: games.postponed
      })
    })
    GamesFeed.getGames(this.props.team.id, moment().format("YYYY-MM-DD"), moment().add(1, 'months').format("YYYY-MM-DD")).then(games => {
      this.setState({
        gamesHomeMonth: games.gamesHome.length,
        valueHomeMonth: this.getValue(games.gamesHome),
        gamesAwayMonth: games.gamesAway.length,
        valueAwayMonth: this.getValue(games.gamesAway),
        postponedMonth: games.postponed
      })
    })
  }

  render() {
    // console.log(`Team: render() ${this.props.team.rank} ${this.props.team.name} (${this.props.team.id})`);
    return (
      <div className="row">
        <div className="col-1 text-right">
          {this.props.team.rank} <span className="small">{this.props.team.rankLast10}</span>
        </div>
        <div className="col-1 text-right">
          <span className="small">{this.props.team.rankHome} {this.props.team.rankAway} {this.props.team.streak}</span>
        </div>
        <div className="col-2" style={{padding: "0 10px 0 0"}}>
          <img src={this.getLogo(this.props.team.id)} alt="" /> {this.state.name} <span className="small">({this.props.team.wins}-{this.props.team.losses}-{this.props.team.ot}) {this.props.team.goalsScored}-{this.props.team.goalsAgainst}</span>
        </div>
        <Period
          gamesHome={this.state.gamesHomeWeek1}
          valueHome={this.state.valueHomeWeek1}
          gamesAway={this.state.gamesAwayWeek1}
          valueAway={this.state.valueAwayWeek1}
          postponed={this.state.postponedWeek1}
        />
        <Period
          gamesHome={this.state.gamesHomeWeek2}
          valueHome={this.state.valueHomeWeek2}
          gamesAway={this.state.gamesAwayWeek2}
          valueAway={this.state.valueAwayWeek2}
          postponed={this.state.postponedWeek2}
        />
        <Period
          gamesHome={this.state.gamesHomeWeek3}
          valueHome={this.state.valueHomeWeek3}
          gamesAway={this.state.gamesAwayWeek3}
          valueAway={this.state.valueAwayWeek3}
          postponed={this.state.postponedWeek3}
        />
        <Period
          gamesHome={this.state.gamesHomeMonth}
          valueHome={this.state.valueHomeMonth}
          gamesAway={this.state.gamesAwayMonth}
          valueAway={this.state.valueAwayMonth}
          postponed={this.state.postponedMonth}
        />
        <div className="col-1 text-right">
          <span className="small">{Picks.filter(p => p.picker === 'A' && p.team === this.props.team.id).map(p => p.jersey).join(', ')}</span> <img src={this.getLogo(this.props.team.id)} alt="" style={{padding: "0 0 0 20px"}} />
        </div>
        <div className="col-2">
          <span className="small">{Picks.filter(p => p.picker !== 'A' && p.team === this.props.team.id).map(p => p.picker+p.jersey).join(', ')}</span>
        </div>
      </div>
    )
  }
}

export default Team;
