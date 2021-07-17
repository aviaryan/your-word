const path = require('path')
const fs = require('fs')
const solc = require('solc')

const helloPath = path.resolve(__dirname, 'contracts', 'promisebox.sol')
const source = fs.readFileSync(helloPath, 'UTF-8')

const input = {
	language: 'Solidity',
	sources: {
		'promisebox.sol': {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
}

const output = JSON.parse(solc.compile(JSON.stringify(input)))
const bytecode = output.contracts['promisebox.sol']['PromiseBox'].evm.bytecode.object
const abi = JSON.parse(output.contracts['promisebox.sol']['PromiseBox'].metadata).output.abi

module.exports = { bytecode, abi }

// Thanks to -
// https://github.com/ethereum/solc-js#example-usage-without-the-import-callback
// https://www.kimsereylam.com/ethereum/solidity/python/2021/04/02/interacting-with-smart-contract-on-local-ethereum-blockchain.html
