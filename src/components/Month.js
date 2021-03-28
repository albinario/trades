import React, { Component } from 'react';
import Functions from '../util/Functions';
import GamesFeed from '../util/GamesFeed';

class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: 0,
      value: 0
    }
  }

  componentDidMount() {
    GamesFeed.getGames(this.props.teamId, this.props.startDate, this.props.endDate).then(games => {
      const gamesValid = games.filter(game => game.games[0].status.detailedState !== "Postponed");
      this.setState({
        games: gamesValid.length,
        value: Functions.getValue(this.props.teamId, gamesValid, this.props.teams)
      })
    })
  }

  render() {
    // console.log('Month: render()');
    return (
      <td>
        {this.state.games} <span className="small">{this.state.value}</span>
      </td>
    )
  }
}

export default Month;
