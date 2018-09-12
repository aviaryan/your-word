Web3 = require('web3')
contract = require('./compile.js')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

abiDefinition = JSON.parse(contract.interface)
WordsContract = new web3.eth.Contract(abiDefinition)

byteCode = contract.bytecode

web3.eth.getAccounts().then(accounts => {
	walletAddress = accounts[0]
	console.log(walletAddress)

	WordsContract.deploy({
		data: byteCode
	}).send({
		from: walletAddress,
		gas: 4700000
	}).then((deployedContract) => {
		deployedContract.methods.saveSomeonesWord(web3.utils.asciiToHex('Luffy'), 'I am the man who will become the king of the pirates').send({
			from: walletAddress
		}).then(receipt => {
			console.log(receipt)
			deployedContract.methods.getWordBy(web3.utils.asciiToHex('Luffy')).call().then(res => {
				console.log(res)
			})
		})
	})
})
