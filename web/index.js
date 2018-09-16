import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js';

// redux
// import { createStore } from 'redux'
// import smcApp from './reducers/index.reducer'
// import { Provider } from 'react-redux'

// uikit
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
UIkit.use(Icons)

// let store = createStore(smcApp)

ReactDOM.render(
	<App />,
	document.getElementById('root')
)
