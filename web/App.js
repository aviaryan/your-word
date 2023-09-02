import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './styles/App.css'
import Web3 from 'web3'
import { abi, address } from './lib/sc.js'
// screens
import Intro from './screens/Intro.js'
import Dashboard from './screens/Dashboard.js'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			connected: false,
			account: null,
			web3: null,
			contract: null,
			cbal: 0.0,
			abal: 0.0,
			tbal: 0.0,
			failed: false,
			hideLoading: true,
		}
	}

	async componentDidMount() {
		if (!window.ethereum) {
			console.log('no eth injected')
			return this.failed()
		}
		let web3 = new Web3(Web3.givenProvider)

		try {
			// thanks to https://ethereum.stackexchange.com/questions/62981/
			// for web3 v1 connection information
			await ethereum.enable()
			const accounts = await web3.eth.getAccounts()
			console.log(accounts)
			if (accounts.length < 1) {
				return this.failed()
			}
			// try connecting to contract
			let contract = new web3.eth.Contract(abi, address, {
				from: accounts[0],
				gasPrice: '20000000000',
				gas: 1500000, // gasPrice same as Ganache node
			})
			// store state
			if (contract) {
				this.setState({ connected: true, account: accounts[0], web3, contract })
				this.fetchBalances()
			} else {
				this.failed()
			}
		} catch (err) {
			this.failed()
			console.error(err)
		}
	}

	failed() {
		if (!window.location.href.endsWith('/help')) {
			window.location.href = '/help'
		}
	}

	fetchBalances() {
		this.state.web3.eth
			.getBalance(this.state.contract.options.address)
			.then((wei) => this.setState({ cbal: wei / 1e18 }))
		this.fetchBalance(this.state.contract.options.address, 'cbal')
		this.fetchBalance(this.state.account, 'abal')
		// creator is the treasury
		// using parcel's production handling
		const creator =
			process.env.NODE_ENV !== 'production'
				? '0x041D5b3Ce06280c3fa2E4Ed31Eedd8c238dA3484' // local deployer
				: '0x66a53cdfc5c36f691a5816c070507a3b429ac115' // rinkeby deployer
		this.fetchBalance(creator, 'tbal')
	}

	fetchBalance(address, key) {
		this.state.web3.eth.getBalance(address).then((wei) => {
			let obj = {}
			obj[key] = Math.round((wei / 1e18) * 100) / 100
			this.setState(obj)
		})
	}

	showLoading(val) {
		this.setState({ hideLoading: !val })
	}

	render() {
		return (
			<div className={styles.app}>
				<div className={[styles.loading, this.state.hideLoading ? styles.hidden : ''].join(' ')}>
					<span>Loading...</span>
				</div>
				{/* navbar */}
				<nav className={styles.navbar}>
					<div className={styles.brand}>
						<a href='/'>YOUR WORD</a>
					</div>
					<div className={styles.navSegment}>
						{this.state.connected ? (
							<div className={styles.balanceItem}>
								<p>👤 USER</p>
								<small>{this.state.abal} ETH</small>
							</div>
						) : (
							<div className={styles.balanceItem}>
								<p title='Please connect to Rinkeby'>❌ DISCONNECTED</p>
							</div>
						)}
						{this.state.connected && (
							<div className={styles.balanceItem}>
								<p>🎩 ESCROW</p>
								<small>{this.state.cbal} ETH</small>
							</div>
						)}
						{this.state.connected && (
							<div className={styles.balanceItem}>
								<p>💎 TREASURE</p>
								<small>{this.state.tbal} ETH</small>
							</div>
						)}
						<div className={styles.balanceItem}>
							<a href='/help'>HELP</a>
						</div>
					</div>
				</nav>

				<div className={styles.container}>
					<Router>
						<Switch>
							<Route
								exact
								path='/'
								render={() => (
									<Dashboard
										{...this.state}
										updated={this.fetchBalances.bind(this)}
										showLoading={this.showLoading.bind(this)}
									/>
								)}
							/>
							<Route exact path='/help' component={Intro} />
						</Switch>
					</Router>
				</div>
			</div>
		)
	}
}

export default App
