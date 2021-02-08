import React, { Component } from 'react';
import Team from './Team';

class TeamList extends Component {
  render() {
    // console.log("TeamList: render()");
    return (
      this.props.teams ?
        this.props.teams.map((team, index) => {
          return (
            <Team
              key={index}
              team={team}
              teams={this.props.teams}
            />
          );
        })
      :
      <div>
        {this.props.message}
      </div>
    )
  }
}

export default TeamList;
