import React, { Component } from 'react'
import styles from './../styles/NickEdit.css'


export default class NickEdit extends Component {
	save() {
		const nick = document.getElementById('nick').value
		this.props.contract.methods.setNick(nick).send({
			from: this.props.account,
			value: 1e18 * 0.001
		}).then(() => {
			// notify parent
			if (this.props.completed) {
				this.props.completed()
			}
		}).catch(console.error)
	}

	cancel() {
		this.props.completed()
	}

	render() {
		return (
			<p>
				<input type="text" id="nick" placeholder="set nick (0.001 eth)" defaultValue={this.props.nick} />
				<button className={styles.btn} onClick={this.save.bind(this)}>save</button>
				{this.props.completed && <button className={styles.btn} onClick={this.cancel.bind(this)}>cancel</button>}
			</p>
		)
	}
}
