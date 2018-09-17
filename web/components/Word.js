import React, { Component } from 'react'
import styles from './../styles/Word.css'


export default class Word extends Component {
	render() {
		return (
			<div className={styles.word}>
				<h3>{this.props.text}</h3>
			</div>
		)
	}
}
