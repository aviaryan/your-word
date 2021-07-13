const { deploy } = require('./lib/deployer')

async function start() {
	const [address, abi] = await deploy()
	console.log(JSON.stringify(abi))
	console.log(address)
}

start()
