import React, { Component } from 'react'
import styles from './../styles/Dashboard.css'
import { setTimeout } from 'timers';
import Word from '../components/Word';
import NickEdit from '../components/NickEdit';


export default class Dashboard extends Component {
	constructor(props) {
		super(props)
		console.log(props)
		this.state = {words: [], name: null, nickEdit: false}
	}

	componentDidMount(){
		this.fetchWords()
	}

	componentDidUpdate(prevProps){
		if (!prevProps.contract){
			this.fetchWords()
			this.loadNick()
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
			this.fetchWords()
		}).catch(console.error)
	}

	wordResolve() {
		this.fetchWords()
		this.props.updated()
	}

	fetchWords(){
		if (!this.props.contract) {
			return
		}
		let wordMap = {}
		this.props.contract.methods.getTotalWords().call().then(num => {
			for (let i=num-1; i>= 0; i--) {
				this.props.contract.methods.getWordById(i).call().then(res => {
					wordMap[i] = <Word key={i} text={res[0]} owner={res[1]} bet={res[2]}
						contract={this.props.contract} account={this.props.account}
						resolved={res[3]} verdict={res[4]} id_={i} updated={this.wordResolve.bind(this)} />
				}).catch(console.error).finally(() => {
					// very bad approach I know but async/await was not working
					let words = []
					for (let i=num-1; i>=0; i--) {
						if (i in wordMap){
							words.push(wordMap[i])
						}
					}
					this.setState({ words })
				})
			}
		}).catch(console.error)
	}

	nickEditFalse(){
		this.setState({nickEdit: false})
		this.loadNick()
		this.fetchWords()
	}

	loadNick(){
		this.props.contract.methods.getNickByAddress(this.props.account).call().then(nick => {
			this.setState({nick})
		})
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
						<h2>Recent Pledges</h2>
						<div>{this.state.words}</div>
					</div>
				</div>
				<div className={styles.right}>
					<h2>Account Information</h2>
					{this.state.nick ?
						<div>{this.state.nickEdit ?
							<NickEdit nick={this.state.nick} completed={this.nickEditFalse.bind(this)}
								contract={this.props.contract} account={this.props.account} />
							:
							<span onClick={() => this.setState({nickEdit: true})} className={styles.nick}>{this.state.nick}</span>
						}</div>
						:
						<NickEdit contract={this.props.contract} account={this.props.account} />
					}
					<p className={styles.addrInfo}>
						<a href={"https://rinkeby.etherscan.io/address/" + this.props.account}>
							{this.props.account}
						</a>
					</p>
				</div>
			</div>
		)
	}
}
