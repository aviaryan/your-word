import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import styles from './styles/App.css'
import Web3 from 'web3';
// screens
import Intro from './screens/Intro.js'
import Dashboard from './screens/Dashboard.js'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {connected: false}
	}

	componentDidMount(){
		if (!window.web3.currentProvider) {
			return;
		}
		let web3 = new Web3(window.web3.currentProvider);
		web3.eth.getAccounts().then(accounts => {
			console.log(accounts)
			this.setState({connected: true})
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
						<a href="#">PROFILE</a>
					</div>
				</nav>

				<Router>
					<Switch>
						<Route exact path="/" component={Dashboard} />
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
		)
	}
}

export default App
