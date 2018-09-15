const web3 = require('./lib.js').getWeb3()
const abi = require('./abi.js')
// const address = '0xB8D11d81Bc119B8e0ab1bE0A597ec336C5C19E37'
const address = '0x226d2FF354af955a7aa1A66E57D739625f7C6135'

async function getAccounts() {
	let accounts = await web3.eth.getAccounts()
	console.log(accounts)
	const someUser = accounts[0]

	let contract = new web3.eth.Contract(abi, address, {
		from: someUser,
		gasPrice: '20000000000',
		gas: 1500000, // gasPrice same as Ganache node
	})

	contract.methods.addWord('I am the man who will become the king of the pirates').send({
		from: someUser,
		value: '1000000000000000000'
	}).then(receipt => {
		// console.log(receipt)
		// tests resolution of word
		contract.methods.getWordById(0).call().then(res => {
			console.log(res)
			contract.methods.resolveWord(0, false).send({
				from: someUser
			}).then(receipt => {
				contract.methods.getContractBalance().call().then(res => {
					console.log('balance new:' + res)
				})
			})
		})
		// tests setting of name
		contract.methods.setNick('luffy').send({
			from: someUser,
			value: '1000000000000000'
		}).then(() => {
			contract.methods.getNickByAddress(someUser).call().then(res => {
				console.log('nick ' + res)
			})
		})
		// tests getting contract balance
		contract.methods.getContractBalance().call().then(res => {
			console.log('balance:' + res)
		})
		// test creating a new account
		// web3.eth.personal.newAccount('!@superpassword')
		// 	.then(console.log);
	})
}

getAccounts();
