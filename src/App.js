import React, { Component } from 'react';
import './App.css';
import TeamFeed from './util/TeamFeed'
import TeamList from './components/TeamList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      message: 'Loading teams...'
    }
    TeamFeed.getTeams().then(teams => {
      this.setState({
        teams: teams,
        message: 'No teams found'
      })
    })
  }
  render() {
    console.log("App: render()");
    return (
      <TeamList teams={this.state.teams} message={this.state.message} />
    );
  }
}

export default App;
