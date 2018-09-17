import React, { Component } from 'react'
import styles from './../styles/Word.css'


export default class Word extends Component {
	constructor(props){
		super(props)
		this.state = {nick: this.props.owner}
	}

	componentDidMount() {
		this.props.contract.methods.getNickByAddress(this.props.owner).call().then(nick => {
			this.setState({ nick })
		})
	}

	render() {
		return (
			<div className={styles.word}>
				<p>
					<b>I will</b> <span>{this.props.text}</span>
				</p>
				<p>
					by <u>{this.state.nick}</u> for {(this.props.bet / 1e18)} eth.
				</p>
			</div>
		)
	}
}
