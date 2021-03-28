import React, { Component } from 'react';
import Functions from '../util/Functions';
import GamesFeed from '../util/GamesFeed';
import Game from './Game';
import moment from 'moment';

class Week extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      value: 0
    }
  }

  componentDidMount() {
    GamesFeed.getGames(this.props.teamId, this.props.startDate, this.props.endDate).then(games => {
      this.setState({
        games: games,
        value: Functions.getValue(this.props.teamId, games.filter(game => game.games[0].status.detailedState !== "Postponed"), this.props.teams)
      })
    })
  }

  render() {
    // console.log('Week: render()');
    let prevDate = 0;
    let first = false;
    let back = false;
    let last = false;
    return (
      <td>
        <span className="small" style={{margin: "0 5px 0 0"}}>{this.state.value}</span>
        {
          this.state.games.map((game, index) => {
            game.date === this.props.startDate ? first = true : first = false;
            prevDate === moment(game.date).subtract(1, 'days').format("YYYY-MM-DD") ? back = true : back = false;
            prevDate = game.date;
            game.date === this.props.endDate ? last = true : last = false;
            let home = false;
            let opponent = false;
            let postponed = false;
            if (game.games[0].teams.home.team.id === this.props.teamId) {
              home = true;
              opponent = game.games[0].teams.away.team.id;
            } else {
              opponent = game.games[0].teams.home.team.id;
            }
            if (game.games[0].status.detailedState === "Postponed") {
              postponed = true;
            }
            return (
              <Game
                key={index}
                home={home}
                opponent={opponent}
                postponed={postponed}
                first={first}
                back={back}
                last={last}
              />
            )
          })
        }
      </td>
    )
  }
}

export default Week;
