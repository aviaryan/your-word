# My Word

Cement your promises in blockchain.
If you fail, you lose 20%, otherwise you get it back.


## Tech

* Web3 v1.0 [[Docs](https://web3js.readthedocs.io/en/1.0/index.html)]
* Solidity (solc)


## Development

```sh
npm install -g ganache-cli
ganache-cli
# run the script
npm run start
```


## SC Deployment

For deploying on Rinkeby testnet

```sh
# export from .env
npm run deploy:testnet
```

For deploying on Ganache

```sh
npm run deploy:local
```


## Network

I had a hard time deciding what network to use. I surely don't want to use the mainnet since it's just a demo app and I want people to try it. I want to, but can't use the popular testnets faucets to fill user's accounts with ether and it doesn't seem like "real".
So I deployed my own network using ganache and a small server.


## Resources

These articles helped me to make this project.

* [Getting started with Solidity DApps](https://hackernoon.com/a-beginners-guide-to-blockchain-programming-4913d16eae31)
