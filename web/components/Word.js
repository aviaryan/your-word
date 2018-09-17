import React, { Component } from 'react'
import styles from './../styles/Word.css'


export default class Word extends Component {
	constructor(props){
		super(props)
		this.state = {nick: this.props.owner}
	}

	componentDidMount() {
		this.props.contract.methods.getNickByAddress(this.props.owner).call().then(nick => {
			if (nick) {
				this.setState({ nick })
			}
		})
	}

	resolve(status){
		this.props.contract.methods.resolveWord(this.props.id_, status).send({
			from: this.props.account
		}).then(() => {
			this.props.updated()
		}).catch(console.error)
	}

	render() {
		return (
			<div className={styles.word}>
				<div className={styles.content}>
					<p>
						<b>I will</b> <span>{this.props.text}</span>
					</p>
					<p>
						by <u>{this.state.nick}</u> for {(this.props.bet / 1e18)} eth.
					</p>
				</div>
				<div className={styles.status}>
					{this.props.resolved ?
						<span>{this.props.verdict ? "✅ SUCCESSFUL" : "❌ FAILED"}</span>
						: <span>{this.props.owner === this.props.account ?
							<span>
								<a onClick={() => this.resolve(true)} className={styles.btn}>✅</a> ⁄ <a
									onClick={() => this.resolve(false)} className={styles.btn}>❌</a>
							</span> : "PENDING"}</span>
					}
				</div>
			</div>
		)
	}
}
