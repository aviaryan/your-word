import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import styles from './styles/App.css'
import Web3 from 'web3';
import {abi, address} from './lib/sc.js'
// screens
import Intro from './screens/Intro.js'
import Dashboard from './screens/Dashboard.js'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {connected: false, account: null, web3: null, contract: null}
	}

	componentDidMount(){
		if (!window.web3.currentProvider) {
			return;
		}
		let web3 = new Web3(window.web3.currentProvider);
		web3.eth.getAccounts().then(accounts => {
			if (accounts.length < 1) {
				return;
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
			}
		}).catch(console.error)
	}

	render() {
		return (
			<div className={styles.app}>
				{/* navbar */}
				<nav className={styles.navbar}>
					<a href="/">YOUR WORD</a>
					<div className={styles.navSegment}>
						<a>{this.state.connected ? "✅ CONNECTED" : "❌ DISCONNECTED"}</a>
						<a href="/welcome">HELP</a>
					</div>
				</nav>

				<div className={styles.container}>
					<Router>
						<Switch>
							<Route exact path="/" render={(props) => <Dashboard {...this.state} />} />
							<Route exact path="/welcome" component={Intro} />
							{/* <Route path="/resources" component={withTracker(Resources)} />
							<Route path="/dashboard" component={withTracker(Authed)} />
							<Route path="/profile" component={withTracker(Authed)} />
							<Route path="/projects" component={withTracker(Authed)} />
							<Route path="/@:username" component={withTracker(Authed)} />
							<Route path="/p/:uid" component={withTracker(Authed)} /> */}
						</Switch>
					</Router>
				</div>
			</div>
		)
	}
}

export default App
