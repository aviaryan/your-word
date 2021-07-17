const { expect, use } = require('chai')
// import { Contract } from 'ethers'
const { deployContract, MockProvider, solidity } = require('ethereum-waffle')
const PromiseBox = require('../contracts/bin/PromiseBox.json')

const Web3 = require('web3')

use(solidity)

describe('PromiseBox', () => {
	const [wallet, wallet2] = new MockProvider().getWallets()
	let contract

	beforeEach(async () => {
		contract = await deployContract(wallet, PromiseBox, [wallet.address])
	})

	it('Creates a word and resolves it negatively', async () => {
		const word = 'I am the man who will become the king of the pirates'
		// check contract balance initially is 0
		expect(await contract.getContractBalance()).to.equal(0)
		// create new word
		// https://stackoverflow.com/a/67121343/2295672 for overrides
		await contract.addWord(
			word,
			(overrides = {
				value: Web3.utils.toWei('0.1'),
			})
		)
		// check new contract balance with locked amount
		expect(await contract.getContractBalance()).to.equal(Web3.utils.toWei('0.1'))
		// check if word was saved correctly
		const wordInfo = await contract.getWordById(0)
		// console.log(wordInfo)
		expect(wordInfo[0]).to.eq(word)
		// payer
		expect(wordInfo[1]).to.eq(wallet.address)
		// bet size
		expect(wordInfo[2]).to.eq(Web3.utils.toWei('0.1'))
		// resolve word with failure
		await contract.resolveWord(0, false)
		// check contrac balance to be 0
		expect(await contract.getContractBalance()).to.equal(0)
	})

	it('Sets nick correctly', async () => {
		const nick = 'Luffy'
		await contract.setNick(
			nick,
			(overrides = {
				value: Web3.utils.toWei('0.001'),
			})
		)
		expect(await contract.getNickByAddress(wallet.address)).to.eq(nick)
	})

	it('Tests resolve failure in 2nd wallet and Transfer to 1st wallet', async () => {
		const contract2 = contract.connect(wallet2)
		// this testing lib uses ethers.js
		// https://docs.ethers.io/v3/api-wallet.html
		const balance = await wallet.getBalance()
		const balance2 = await wallet2.getBalance()
		// add word
		await contract2.addWord(
			'X',
			(overrides = {
				value: Web3.utils.toWei('1'),
			})
		)
		// check if word has 2nd account as payer
		const wordInfo = await contract.getWordById(0)
		expect(wordInfo[1]).to.eq(wallet2.address)
		// fail the world
		await contract2.resolveWord(0, false)
		// check balances
		// gt and lt are BigNumber matchers
		// https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
		expect(await wallet.getBalance()).to.be.gt(balance)
		expect(await wallet2.getBalance()).to.be.lt(balance2)
	})

	it('Word with 0 length is not created', async () => {
		// https://ethereum-waffle.readthedocs.io/en/latest/matchers.html#revert-with-message
		await expect(
			contract.addWord(
				'',
				(overrides = {
					value: Web3.utils.toWei('1'),
				})
			)
		).to.be.revertedWith('Text cannot be empty')
	})
})
