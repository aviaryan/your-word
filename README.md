# Your Word

[![Testing CI](https://github.com/aviaryan/your-word/actions/workflows/ci.yml/badge.svg)](https://github.com/aviaryan/your-word/actions/workflows/ci.yml)

https://word.aviaryan.com/

Store your promises in the blockchain and bet some money against it.
If you fail, you lose 50% of your bet, otherwise you get 100% back 🤣. Don't worry though, it runs on the Rinkeby testnet, so you won't be playing with any real money.

![screenshot](https://i.imgur.com/Skru8bm.png)

![payment](https://i.imgur.com/goDOusx.png)

![help](https://i.imgur.com/OX7FGEp.png)

## Tech

* Web3
* Solidity (solc)
* React


## Development

The development part of this project can be divided into 3 parts.

1. Smart contract deployment (on local or test networks)
2. Smart contract testing
3. Web app development


### 1. Smart contract deployment

For deploying on Ganache (GUI version) local test network

```sh
# run ganance before this
npm run deploy:local
```

For deploying on Rinkeby testnet

```sh
# export from .env
npm run deploy:testnet
```

You will have to set up the keys in `.env` file. Private key is private key of the address that is deploying and infura project ID is the project ID at Infura.


### 2. Smart contract testing

Run the test script. The following command tests it against a local Ganache GUI network.

```sh
npm run test
```

If you want to test it against the Rinkeby testnet, run the following command.

```sh
npm run test:net
```


### 3. Web app development

Copy the contract ABI and the contract addresses generated by deploy script to `lib/sc.js`. Then run the following -

```sh
npm run start
```


## Building and Deployment

Smart contract deployments have already been covered in the previous section.

To deploy the web app, first build it

```sh
npm run build
```

Then deploy it on surge.sh.

```sh
npm run deploy:web
```


## Resources

These articles helped me to make this project.

* [Getting started with Solidity DApps](https://hackernoon.com/a-beginners-guide-to-blockchain-programming-4913d16eae31)
* [Using an Ethereum testnet](https://medium.com/compound-finance/the-beginners-guide-to-using-an-ethereum-test-network-95bbbc85fc1d)
