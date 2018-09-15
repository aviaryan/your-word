const Web3 = require('web3')
const contract = require('./compile.js')
const getWeb3 = require('./tests/lib').getWeb3


function deploy(treasure, web3) {
	const abiDefinition = JSON.parse(contract.interface)
	console.log(contract.interface)
	// print ABI
	const WordsContract = new web3.eth.Contract(abiDefinition, null, {
		gas: 1500000, // gasPrice same as Ganache node
		gasPrice: '20000000000'
	})

	const byteCode = contract.bytecode

	return new Promise((resolve, reject) => {
		WordsContract.deploy({
			data: byteCode,
			arguments: [treasure]
		}).send({
			from: treasure,
		}).then(deployedContract => {
			resolve(deployedContract.options.address)
		}).catch(reject)
	})
}

async function start(){
	web3 = getWeb3()
	console.log('hi')
	let accounts = await web3.eth.getAccounts()
	const treasure = accounts[0]
	let deployedContract = await deploy(treasure, web3);
	console.log(deployedContract);
}

start()
