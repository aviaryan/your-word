import React, { Component } from 'react'
import styles from './../styles/Word.css'


export default class Word extends Component {
	render() {
		return (
			<div className={styles.word}>
				<p>
					<b>I will</b> <span>{this.props.text}</span>
				</p>
				<p>
					by <u>{this.props.owner}</u> for 0.05 eth.
				</p>
			</div>
		)
	}
}
