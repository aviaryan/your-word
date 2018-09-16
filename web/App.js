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

class App extends Component {
	componentDidMount(){
		let web3 = new Web3(window.web3.currentProvider);
		web3.eth.getAccounts().then(accounts => {
			console.log(accounts)
		}).catch(console.error)
	}

	render() {
		return (
			<div className={styles.app}>
				<b>hi</b>
				<Router>
					<Switch>
						<Route exact path="/" component={Intro} />
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
