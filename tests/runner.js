const Web3 = require('web3')
const ganache = require('ganache-cli')
// using https://github.com/trufflesuite/ganache-core

const localPrivateKey = '496737f7a25cf271f12d3977c8bf5cb95e7a34e3f71f0755af44e87776c9828a'
// thanks to https://ethereum.stackexchange.com/questions/93909/
const privateKeyBuffer = Buffer.from(localPrivateKey, 'hex')

// options taken from https://github.com/trufflesuite/ganache-core/tree/master#options
const options = {
	accounts: [
		{
			secretKey: privateKeyBuffer,
			// 100 eth
			balance: '0x56BC75E2D63100000',
		},
	],
}
const provider = ganache.provider(options)

const web3 = new Web3(provider)

async function fx() {
	const accounts = await web3.eth.getAccounts()
	console.log(accounts)
	web3.eth.getBalance(accounts[0]).then((wei) => {
		const number = Math.round((wei / 1e18) * 100) / 100
		console.log(number)
	})
}

fx()
