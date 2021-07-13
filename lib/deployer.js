// const Web3 = require('web3')
const getWeb3 = require('./getWeb3').getWeb3

function compileABI() {
	const contract = require('./../compile.js')
	return contract
}

function deployContract(deployer, web3, contract) {
	const abiDefinition = JSON.parse(contract.interface)

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

async function getDeployer(web3) {
	let accounts = await web3.eth.getAccounts()
	// treasure address is the deployer and also the treasury address
	const treasure = accounts[0]
	return treasure
}

async function deploy() {
	// console.log('hi')
	web3 = getWeb3()
	const deployer = await getDeployer(web3)
	const contract = compileABI()
	let contractAddress = await deployContract(deployer, web3, contract)
	// console.log('deployed at', contractAddress)
	const abiDefinition = JSON.parse(contract.interface)
	return [contractAddress, abiDefinition]
}

module.exports = { deploy }
