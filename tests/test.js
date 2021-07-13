const web3 = require('../lib/getWeb3.js').getWeb3()
const { abi, address } = require('./../web/lib/sc')
const { deploy } = require('../lib/deployer')

async function getAccounts() {
	const [address, abi] = await getAddressAndAbi()

	let accounts = await web3.eth.getAccounts()
	// console.log(accounts)
	const someUser = accounts[0]

	let contract = new web3.eth.Contract(abi, address, {
		from: someUser,
		gasPrice: '20000000000', // gasPrice same as Ganache node and ganache cli
		gas: 6721975, // gas limit increased to ganache-cli default 0x6691b7
	})

	const addWordReceipt = await contract.methods
		.addWord('I am the man who will become the king of the pirates')
		.send({
			from: someUser,
			value: web3.utils.toWei('0.1'),
		})
	console.log(addWordReceipt)

	const totalWords = await contract.methods.getTotalWords().call()

	console.log(totalWords)
	const createdWordId = totalWords - 1

	// tests resolution of word
	contract.methods
		.getWordById(createdWordId)
		.call()
		.then((res) => {
			console.log(res)
			contract.methods
				.resolveWord(createdWordId, false)
				.send({
					from: someUser,
				})
				.then((receipt) => {
					contract.methods
						.getContractBalance()
						.call()
						.then((res) => {
							console.log('balance new:' + res)
						})
				})
		})
	// tests setting of name
	contract.methods
		.setNick('luffy')
		.send({
			from: someUser,
			value: web3.utils.toWei('0.001'),
		})
		.then(() => {
			contract.methods
				.getNickByAddress(someUser)
				.call()
				.then((res) => {
					console.log('nick ' + res)
				})
		})
	// tests getting contract balance
	contract.methods
		.getContractBalance()
		.call()
		.then((res) => {
			console.log('balance:' + res)
		})
	// test creating a new account
	// web3.eth.personal.newAccount('!@superpassword')
	// 	.then(console.log);
	// })
}

async function getAddressAndAbi() {
	if (process.env.TESTING) {
		const [address, abi] = await deploy()
		return [address, abi]
	} else {
		return [address, abi]
	}
}

getAccounts()
