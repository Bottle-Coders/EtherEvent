---
sidebar_position: 2
title: MVP Deploy
---

We have deployed the MVP on the following services:

-   Frontend: [Vercel](https://vercel.com/) 🌐
-   Offchain: [Heroku](https://www.heroku.com/) ☁️
-   Contracts: [iExec Sidechain](https://chainlist.org/chain/134), with the ABI's and addresses on [IPFS](https://ipfs.tech/) 🔗

## Frontend 💻

The frontend of the MVP is deployed on Vercel, and you can access it by visiting [ipresence.vercel.app](https://ipresence.vercel.app/). The frontend has a CD pipeline that deploys changes on the `main` branch automatically. The embedded frontend is shown below:

<iframe src="https://ipresence.vercel.app/" width="100%" height="600" frameborder="0" allowfullscreen></iframe>

## Offchain 🖥️

The offchain service provides the backend services for blockchain events interaction. It is deployed on Heroku and also has a CD pipeline that deploys the changes on the `main` branch automatically. However, it is not accessible to the public because it is a backend service. The latest deploy logs:

```markdown
heroku[offchain.1]: Starting process with command `sh -c "cd offchain && python3 main.py"`
heroku[offchain.1]: State changed from starting to up
app[offchain.1]: Loading contract from: https://gateway.pinata.cloud/ipfs/QmPdsBB99ZPRQACiKNtxzLogB9hLEgiXJPdNdtSccn2kxZ
app[offchain.1]: Loading contract at address: 0x186953EEAa009247EAf45FEeB5D037Af874C74De
app[offchain.1]: Waiting for events...
```

## Contracts 📄

Here are the current deployed contracts on the `iExec Sidechain`, with the ABI's and addresses on IPFS. You can find the ABI's and the addresses of the [project contracts](https://github.com/Bottle-Coders/iPresence/tree/main/smartcontracts/packages/hardhat/contracts) by getting the `address` and `abi` properties of the deployed contracts:

IPFS links:

> The contracts are deployed on the `iExec Sidechain` and the ABI's and addresses are stored on IPFS.

-   [UserRegistry](https://gateway.pinata.cloud/ipfs/QmXQkYeqnAhCzd1xCxSqJ3GAG8G5irqXMdoxzL4QF28NeF)
-   [EventManager](https://gateway.pinata.cloud/ipfs/QmeA1w3neJexq6pMsFU1tt4bKj25YafjtVCrDXYRwGqwxo)
-   [CheckInManager](https://gateway.pinata.cloud/ipfs/QmPdsBB99ZPRQACiKNtxzLogB9hLEgiXJPdNdtSccn2kxZ)

Blockscout links:

> All the contracts are deployed on the `iExec Sidechain` and can be found on the [Blockscout](https://blockscout-bellecour.iex.ec/) explorer. Also, all the contracts are verified on the explorer with the source code.

-   [UserRegistry](https://blockscout-bellecour.iex.ec/address/0xa89a5609A98a9fe1A29823Eb9cCDD6d7A694001B)
-   [EventManager](https://blockscout-bellecour.iex.ec/address/0xf0d25784782ce6229fCbe5eE4366A7Bb4103C70F)
-   [CheckInManager](https://blockscout-bellecour.iex.ec/address/0x186953EEAa009247EAf45FEeB5D037Af874C74De)
