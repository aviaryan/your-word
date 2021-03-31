const Web3 = require('web3')
const PrivateKeyProvider = require('truffle-privatekey-provider')

function getWeb3() {
	if (process.env.TESTNET) {
		const url = 'https://rinkeby.infura.io/v3/' + process.env.INFURA_PROJECT_ID
		const privateKey = process.env.PRIVATE_KEY
		// console.log(url, privateKey)
		return new Web3(new PrivateKeyProvider(privateKey, url))
	} else {
		return new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
	}
}

module.exports = { getWeb3 }
