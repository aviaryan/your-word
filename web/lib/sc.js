const { abi, address } = require('./sc_local')
const { abi_t, address_t } = require('./sc_testnet')

// using parcel's environment var
const isLocal = process.env.NODE_ENV !== 'production'

const contract = {
	abi: isLocal ? abi : abi_t,
	address: isLocal ? address : address_t,
}

module.exports = contract
