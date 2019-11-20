import React, { Component } from 'react';
import Picks from '../util/Picks';
import Team from './Team';

class TeamList extends Component {
  render() {
    console.log("TeamList: render()");
    return (
      this.props.teams.length > 0 ?
        this.props.teams.map((team, index) => {
          let picksAlbin = [];
          let picksOthers = [];
          Picks.Albin.forEach(pick => {
            if (team.id === pick.team) {
              picksAlbin.push(`${pick.pos}${pick.jersey}`);
            }
          })
          Picks.Jakob.forEach(pick => {
            if (team.id === pick.team) {
              picksOthers.push(`J${pick.pos}${pick.jersey}`);
            }
          })
          Picks.Sacke.forEach(pick => {
            if (team.id === pick.team) {
              picksOthers.push(`S${pick.pos}${pick.jersey}`);
            }
          })
          Picks.Ville.forEach(pick => {
            if (team.id === pick.team) {
              picksOthers.push(`V${pick.pos}${pick.jersey}`);
            }
          })
          return (
            <Team
              key={index}
              team={team}
              teams={this.props.teams}
              picksAlbin={picksAlbin}
              picksOthers={picksOthers}
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
