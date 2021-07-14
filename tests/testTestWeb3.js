const { getTestWeb3 } = require('../lib/getTestWeb3')

async function start() {
	const web3 = getTestWeb3()
	const accounts = await web3.eth.getAccounts()
	console.log(accounts)
	web3.eth.getBalance(accounts[0]).then((wei) => {
		const number = Math.round((wei / 1e18) * 100) / 100
		console.log(number)
	})
}

start()
