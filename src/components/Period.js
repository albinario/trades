import React, { Component } from 'react';
import Functions from '../util/Functions';
import GamesFeed from '../util/GamesFeed';

class Period extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesHome: 0,
      valueHome: 0,
      gamesAway: 0,
      valueAway: 0,
      postponed: 0
    }
    GamesFeed.getGames(this.props.teamId, this.props.startDate, this.props.endDate).then(games => {
      this.setState({
        gamesHome: games.gamesHome.length,
        valueHome: Functions.getValue(this.props.teamId, games.gamesHome, this.props.teams),
        gamesAway: games.gamesAway.length,
        valueAway: Functions.getValue(this.props.teamId, games.gamesAway, this.props.teams),
        postponed: games.postponed
      })
    })
  }

  render() {
    // console.log('Period: render()');
    return (
      <div className="col-1 text-center">
        {this.state.gamesHome} <span className="small">{this.state.valueHome}</span> {this.state.gamesAway} <span className="small">{this.state.valueAway}</span> {this.state.postponed > 0 && <span style={{color: "red"}}>{this.state.postponed}</span>}
      </div>
    )
  }
}

export default Period;
