import React, { Component } from 'react';
import Functions from '../util/Functions';
import GamesFeed from '../util/GamesFeed';

class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    GamesFeed.getGames(this.props.teamId, this.props.startDate, this.props.endDate).then(games => {
      this.setState({
        games: games.filter(game => game.games[0].status.detailedState !== "Postponed")
      })
    })
  }

  render() {
    // console.log('Month: render()');
    const value = (this.state.games) ? Functions.getValue(this.props.teamId, this.state.games, this.props.teams) : 0;
    return (
      <td>
        {this.state.games.length} <span className="small">{value}</span>
      </td>
    )
  }
}

export default Month;
