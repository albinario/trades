import React, { Component } from 'react';
import Functions from '../util/Functions';

class Game extends Component {
	render() {
		// console.log('Game: render()');
		let className = '';
		if (this.props.postponed) {
			className = 'postponed';
		} else if (this.props.home) {
			className = 'home';
		}
		if (this.props.first) {
			className += ' first';
		} else {
			if (this.props.back) {
				className += ' back';
			}
			if (this.props.last) {
				className += ' last'
			}
		}
		return (
			<img src={Functions.getLogo(this.props.opponent)} alt="" className={className} title={this.props.date} />
		)
	}
}

export default Game;