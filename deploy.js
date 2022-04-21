const getWeb3 = require('./lib/getWeb3').getWeb3
const { deploy } = require('./lib/deployer')

async function start() {
	const web3 = getWeb3()
	const [address, abi] = await deploy(web3)
	console.log(JSON.stringify(abi))
	console.log(address)
	// copy these to lib/sc_* files
}

start()
