Web3 = require('web3')
contract = require('./compile.js')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))

abiDefinition = JSON.parse(contract.interface)
WordsContract = new web3.eth.Contract(abiDefinition, null, {
	gas: 1500000,
	// gasPrice same as Ganache node
	gasPrice: '20000000000'
})

byteCode = contract.bytecode

web3.eth.getAccounts().then(accounts => {
	escrow = accounts[0]
	treasure = accounts[1]
	someUser = accounts[2]
	console.log(escrow, treasure, someUser)

	WordsContract.deploy({
		data: byteCode,
		arguments: [escrow, treasure]
	}).send({
		from: escrow,
	}).then((deployedContract) => {
		deployedContract.methods.addWord('I am the man who will become the king of the pirates').send({
			from: someUser,
		}).then(receipt => {
			console.log(receipt)
			deployedContract.methods.getWordById(0).call().then(res => {
				console.log(res)
			})
		})
	})
})
