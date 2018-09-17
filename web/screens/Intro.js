import React, { Component } from 'react'
import styles from './../styles/Intro.css'


export default class Intro extends Component {
	render() {
		return (
			<div className={styles.help}>
				<h1>How to use this app?</h1>
				<p>
					1. Connect to the <a href="https://www.rinkeby.io/#stats">Rinkeby Test Net</a> using Metamask.
				</p>
				<p>
					2. Load some funds in your test wallet by using the <a href="https://faucet.rinkeby.io/">faucet</a>.
					Refer this <a href="https://medium.com/compound-finance/95bbbc85fc1d">Medium article</a>.
				</p>
				<p>
					3. You should be able to see the balances on the <a href="/">home page</a> now.
				</p>
				<p>
					4. Give the blockchain your word and bet some money on it.
				</p>
				<p>
					5. If you manage to keep your word, mark it ✅  otherwise mark it ❌.
				</p>
			</div>
		)
	}
}
