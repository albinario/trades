import React, { Component } from 'react';
import moment from 'moment';
import Functions from '../util/Functions';
import Picks from '../util/Picks';
import Week from './Week';
import Month from './Month';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: Functions.cleanName(this.props.team.name)
    }
  }

  render() {
    // console.log(`Team: render() ${this.props.team.rank} ${this.props.team.name} (${this.props.team.id})`);
    return (
      <tr>
        <td className="text-center">
          {this.props.team.rank}
        </td>
        <td className="text-center">
          <span className="small">{this.props.team.rankLast10}</span>
        </td>
        <td className="text-right">
          {this.props.team.rankDivision}
        </td>
        <td className="text-right">
          <span className="small">{this.props.team.streak}</span>
        </td>
        <td>
          <img src={Functions.getLogo(this.props.team.id)} alt="" /> {this.state.name} <span className="small">({this.props.team.wins}-{this.props.team.losses}-{this.props.team.ot})</span>
        </td>
        <td>
          <span className="small">{this.props.team.goalsScored}-{this.props.team.goalsAgainst}</span>
        </td>
        <Week
          teamId={this.props.team.id}
          startDate={moment().format("YYYY-MM-DD")}
          endDate={moment().add(6, 'days').format("YYYY-MM-DD")}
          teams={this.props.teams}
        />
        <Week
          teamId={this.props.team.id}
          startDate={moment().add(7, 'days').format("YYYY-MM-DD")}
          endDate={moment().add(13, 'days').format("YYYY-MM-DD")}
          teams={this.props.teams}
        />
        <Week
          teamId={this.props.team.id}
          startDate={moment().add(14, 'days').format("YYYY-MM-DD")}
          endDate={moment().add(20, 'days').format("YYYY-MM-DD")}
          teams={this.props.teams}
        />
        <Month
          teamId={this.props.team.id}
          startDate={moment().format("YYYY-MM-DD")}
          endDate={moment().add(1, 'months').format("YYYY-MM-DD")}
          teams={this.props.teams}
        />
        <td className="text-right">
          <span className="small">{Picks.filter(p => p.picker === 'A' && p.team === this.props.team.id).sort((a,b) => a.jersey-b.jersey).map(p => p.jersey).join(', ')}</span>
        </td>
        <td className="text-center">
          <img src={Functions.getLogo(this.props.team.id)} alt="" />
        </td>
        <td>
          <span className="small">{Picks.filter(p => p.picker !== 'A' && p.team === this.props.team.id).sort((a,b) => a.jersey-b.jersey).map(p => p.picker+p.jersey).join(', ')}</span>
        </td>
      </tr>
    )
  }
}

export default Team;
