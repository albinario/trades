import React, { Component } from 'react';
import './App.css';
import TeamFeed from './util/TeamFeed'
import TeamList from './components/TeamList';
import { getPicks } from './util/PicksFeed';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: [],
			picks: [],
			message: 'Loading teams and picks...'
		}

		TeamFeed.getTeams().then(teams => {
			this.setState({
				teams: teams,
				message: 'No teams found'
			})
		})
	}

	async componentDidMount() {
		try {
			this.setState({
				picks: await getPicks()
			})
		} catch(err) {
			console.log("There was an error:", err)
		}
	}

	render() {
		// console.log("App: render()");
		return (
			<table className="mytable">
				<tbody>
					<TeamList
						teams={this.state.teams}
						picks={this.state.picks}
						message={this.state.message}
					/>
				</tbody>
			</table>
		);
	}
}

export default App;