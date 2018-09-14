contract = require('./compile.js')

module.exports = (treasure, web3) => {
	const abiDefinition = JSON.parse(contract.interface)
	const WordsContract = new web3.eth.Contract(abiDefinition, null, {
		gas: 1500000,
		// gasPrice same as Ganache node
		gasPrice: '20000000000'
	})

	const byteCode = contract.bytecode

	return new Promise((resolve, reject) => {
		WordsContract.deploy({
			data: byteCode,
			arguments: [treasure]
		}).send({
			from: treasure,
		}).then(resolve).catch(reject)
	})
}
