import React, { Component } from 'react';
import moment from 'moment';
import Functions from '../util/Functions';
import Picks from '../util/Picks';
import Period from './Period';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: Functions.cleanName(this.props.team.name)
    }
  }

  render() {
    console.log(`Team: render() ${this.props.team.rank} ${this.props.team.name} (${this.props.team.id})`);
    return (
      <div className="row">
        <div className="col-1 text-right">
          {this.props.team.rank} <span className="small">{this.props.team.rankLast10}</span>
        </div>
        <div className="col-1 text-right">
          <span className="small">{this.props.team.rankHome} {this.props.team.rankAway} {this.props.team.streak}</span>
        </div>
        <div className="col-2" style={{padding: "0 10px 0 0"}}>
          <img src={Functions.getLogo(this.props.team.id)} alt="" /> {this.state.name} <span className="small">({this.props.team.wins}-{this.props.team.losses}-{this.props.team.ot}) {this.props.team.goalsScored}-{this.props.team.goalsAgainst}</span>
        </div>
        <Period
          teamId={this.props.team.id}
          startDate={moment().format("YYYY-MM-DD")}
          endDate={moment().add(6, 'days').format("YYYY-MM-DD")}
          teams={this.props.teams}
        />
        <Period
          teamId={this.props.team.id}
          startDate={moment().add(7, 'days').format("YYYY-MM-DD")}
          endDate={moment().add(13, 'days').format("YYYY-MM-DD")}
          teams={this.props.teams}
        />
        <Period
          teamId={this.props.team.id}
          startDate={moment().add(14, 'days').format("YYYY-MM-DD")}
          endDate={moment().add(20, 'days').format("YYYY-MM-DD")}
          teams={this.props.teams}
        />
        <Period
          teamId={this.props.team.id}
          startDate={moment().format("YYYY-MM-DD")}
          endDate={moment().add(1, 'months').format("YYYY-MM-DD")}
          teams={this.props.teams}
        />
        <div className="col-1 text-right">
          <span className="small">{Picks.filter(p => p.picker === 'A' && p.team === this.props.team.id).map(p => p.jersey).join(', ')}</span> <img src={Functions.getLogo(this.props.team.id)} alt="" style={{padding: "0 0 0 20px"}} />
        </div>
        <div className="col-2">
          <span className="small">{Picks.filter(p => p.picker !== 'A' && p.team === this.props.team.id).map(p => p.picker+p.jersey).join(', ')}</span>
        </div>
      </div>
    )
  }
}

export default Team;
