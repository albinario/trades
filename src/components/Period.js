import React, { Component } from 'react';

class Period extends Component {
  render() {
    // console.log(`Team: render() ${this.props.team.rank} ${this.props.team.name} (${this.props.team.id})`);
    return (
      <div className="col-1 text-center">
        {this.props.gamesHome} <span className="small">{this.props.valueHome}</span> {this.props.gamesAway} <span className="small">{this.props.valueAway}</span> {this.props.postponed > 0 && <span style={{color: "red"}}>{this.props.postponed}</span>}
      </div>
    )
  }
}

export default Period;
