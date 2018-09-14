Web3 = require('web3')
contract = require('./compile.js')
deploy = require('./deploy.js')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))


async function getAccounts() {
	let accounts = await web3.eth.getAccounts();
	const treasure = accounts[0]
	const someUser = accounts[1]

	let deployedContract = await deploy(treasure, web3);
	deployedContract.methods.addWord('I am the man who will become the king of the pirates').send({
		from: someUser,
		value: '1000000000000000000'
	}).then(receipt => {
		console.log(receipt)
		deployedContract.methods.getWordById(0).call().then(res => {
			console.log(res)
			deployedContract.methods.resolveWord(0, false).send({
				from: someUser
			}).then(receipt => {
				deployedContract.methods.getContractBalance().call().then(res => {
					console.log('balance new:' + res)
				})
			})
		})
		deployedContract.methods.getContractBalance().call().then(res => {
			console.log('balance:' + res)
		})
	})
}

getAccounts();
