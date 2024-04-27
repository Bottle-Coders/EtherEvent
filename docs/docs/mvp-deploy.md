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
app[offchain.1]: Loading contract from: https://gateway.pinata.cloud/ipfs/QmSJKQ1K1Rikxe3m18cC2dWed1sBaxwnwuKbGZptxcQnbB
app[offchain.1]: Loading contract at address: 0x3B684c8330A0cDF52625504925dfDd27E6af1a1b
app[offchain.1]: Waiting for events...
```

## Contracts 📄

Here are the current deployed contracts on the `iExec Sidechain`, with the ABI's and addresses on IPFS. You can find the ABI's and the addresses of the [project contracts](https://github.com/Bottle-Coders/iPresence/tree/main/smartcontracts/packages/hardhat/contracts) by getting the `address` and `abi` properties of the deployed contracts:

-   [UserRegistry](https://gateway.pinata.cloud/ipfs/QmTfK9PZXJkDXqCmT6rwT7o268jjpwtUkJr7aCFuuCQkgk)
-   [EventManager](https://gateway.pinata.cloud/ipfs/QmP5GCxh9vJHQtQ6gt1nDziXJNtRSgmfjsYZyDtPmacVqo)
-   [CheckInManager](https://gateway.pinata.cloud/ipfs/QmSJKQ1K1Rikxe3m18cC2dWed1sBaxwnwuKbGZptxcQnbB)
