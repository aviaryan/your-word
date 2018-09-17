import React, { Component } from 'react'
import styles from './../styles/Dashboard.css'
import { setTimeout } from 'timers';
import Word from '../components/Word';


export default class Dashboard extends Component {
	constructor(props) {
		super(props)
		console.log(props)
		this.state = {words: []}
	}

	componentDidMount(){
		this.fetchWords()
	}

	componentDidUpdate(prevProps){
		if (!prevProps.contract){
			this.fetchWords()
		}
	}

	pledge(){
		const text = document.getElementById('text').value
		const value = document.getElementById('value').value
		console.log(text, value)
		this.props.contract.methods.addWord(text).send({
			from: this.props.account,
			value: 1e18 * value
		}).then((rec) => {
			console.log(rec.transactionHash)
			document.getElementById('text').value = ''
			document.getElementById('value').value = ''
		}).catch(console.error)
	}

	fetchWords(){
		if (!this.props.contract) {
			return
		}
		let words = []
		this.props.contract.methods.getTotalWords().call().then(num => {
			for (let i=num-1; i>= 0; i--) {
				this.props.contract.methods.getWordById(i).call().then(res => {
					console.log(res[0], res[1])
					words.push(<Word key={i} text={res[0]} owner={res[1]} />)
				}).catch(console.error).finally(() => this.setState({ words }))
			}
		}).catch(console.error)
	}

	render() {
		return (
			<div className={styles.dash}>
				<div className={styles.left}>
					<div>
						<p>I will <input type="text" placeholder="make $5k/mo by December" id="text" className={styles.editBox} /></p>
						<p>and I am pledging <input type="number" id="value" required min="0.001" step="0.001" placeholder="0.05" className={styles.price} />
						eth against it.
						<span className={styles.button} onClick={this.pledge.bind(this)}>DO IT!</span></p>
					</div>
					<div className={styles.transactions}>
						<h2>Last Promises</h2>
						<div>{this.state.words}</div>
					</div>
				</div>
				<div className={styles.right}>
					<h2>Account Information</h2>
					{this.props.account}
				</div>
			</div>
		)
	}
}
