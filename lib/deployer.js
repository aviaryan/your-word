function compileContract() {
	const contract = require('./../compile.js')
	return contract
}

function deployContract(deployer, web3, contract) {
	const abiDefinition = contract.abi

	const WordsContract = new web3.eth.Contract(abiDefinition, null, {
		gas: 1500000, // gasPrice same as Ganache node
		gasPrice: '20000000000',
	})

	const byteCode = contract.bytecode

	return new Promise((resolve, reject) => {
		WordsContract.deploy({
			data: byteCode,
			arguments: [deployer],
		})
			.send({
				from: deployer,
			})
			.then((deployedContract) => {
				resolve(deployedContract.options.address)
			})
			.catch(reject)
	})
}

async function getTreasureAddress(web3) {
	let accounts = await web3.eth.getAccounts()
	// treasure address is the deployer and also the treasury address
	const treasure = accounts[0]
	return treasure
}

async function deploy(web3) {
	// console.log('hi')
	const deployer = await getTreasureAddress(web3)
	const contract = compileContract()
	let contractAddress = await deployContract(deployer, web3, contract)
	// console.log('deployed at', contractAddress)
	return [contractAddress, contract.abi]
}

module.exports = { deploy }
