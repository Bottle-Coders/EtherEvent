---
sidebar_position: 0
title: Structures
---

Here you can find the structure of the project, including the smart contracts, frontend, offchain, docker services, and CI/CD workflow. 🏗️

## High Level Overview of user interaction 🌐

A user interaction diagram that shows the flow of the user interaction with the system. The user can register, create an event, check-in to an event, and validate the check-in.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/Hy7zLRFrPoBZBa9R27vPeY"></iframe>

## Overview technology architecture 🏗️

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/HLWXKcEg7y4tS4nv4Gs2N1"></iframe>

## Folders 📁

-   [.github](https://github.com/Bottle-Coders/iPresence/tree/main/.github): Github actions for the project, with the tests and autodeploy of the frontend and offchain services. 🛠️
-   [docs](https://github.com/Bottle-Coders/iPresence/tree/main/docs): Documentation of the project with [docusaurus](https://docusaurus.io/). _You are here 🤓_.
-   [frontend](https://github.com/Bottle-Coders/iPresence/tree/main/frontend): The [Next.js](https://nextjs.org/) application for the frontend of the project with [rainbowkit](https://www.rainbowkit.com/), [wagmi](https://wagmi.sh/) for integration on the blockchain and [iExec SDK](https://tools.docs.iex.ec/) for the confidential computing. 💻
-   [offchain](https://github.com/Bottle-Coders/iPresence/tree/main/offchain): Offchain [python](https://www.python.org/) service for the project, with the [web3](https://github.com/ethereum/web3.py) package to listen to events on the blockchain and validate the face recognition and geo-location of the users. 🐍
-   [smartcontracts](https://github.com/Bottle-Coders/iPresence/tree/main/smartcontracts): Repository of [Scaffold-eth-2](https://github.com/scaffold-eth/scaffold-eth-2) with the smart contracts and tests for the project. 📜
-   `Dockerfile.* and docker-compose-*.yml`: Docker containers for the services of the project, with [docker-compose](https://docs.docker.com/compose/) for the development, production, and test environments. 🐳
-   `Procfile`: Heroku file to run the offchain service in the cloud. ☁️
-   `.env.example`: Example of the environment variables file for the project. 🔐

## Contracts 📄

You can find the smart contracts in the [contracts folder](https://github.com/Bottle-Coders/iPresence/tree/main/smartcontracts/packages/hardhat/contracts) and the tests in the [test folder](https://github.com/Bottle-Coders/iPresence/tree/main/smartcontracts/packages/hardhat/test) of the repository. The contracts are written in Solidity and are used to manage the user registry, event management, and check-in processes. The tests are written in TypeScript and are used to ensure the contracts are functioning as expected with different scenarios.

### UserRegistry 📚

Manages user registrations and their facial identifiers, ensuring added security through encapsulation. Users are identified by addresses, and their data includes names and IPFS hashes of facial images. The contract employs modifiers to validate user existence, name, and face hash integrity. Features functions for registering, updating, and retrieving user information, with events logged for new registrations and updates.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/593qpT6XgHF1otJqQq3Ytu"></iframe>

### EventManager 🎉

Manages event creation and details, tailored for use with a decentralized platform. It defines an `Event` struct to store comprehensive event details, including name, description, image hash (stored as an IPFS hash), location (latitude and longitude), owner, start and end times, and an activity status. The contract supports creating new events, updating existing events, and retrieving event information, ensuring actions such as updates are restricted to the event's owner. Modifiers validate event data, including time ranges, locations, and IPFS image hashes. Events for creation are emitted to log activity.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/Q6s5cuHUuojB4i8RJvsH2T"></iframe>

### CheckInManager 📌

Manages check-in requests and validations for events, integrating with external `EventManager` and `UserRegistry` contracts. It supports functionalities including request submission, off-chain validation, and check-in status management. Structs and enums define check-in data and status. Features include limiting check-in attempts, validating event existence and timing, and ensuring actions are performed by designated roles such as the off-chain validator. The contract emits events for different stages of the check-in process, enabling transparency and traceability. It allows users to retrieve their check-in statuses and provides functionalities for the off-chain validator to approve or reject check-ins based on external validations.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/4B4zVB8PfMJAxG1MxycipT"></iframe>

### Internal Interaction Sequence 🔀

This diagram illustrates the sequence of interactions between the contracts, including the `UserRegistry`, `EventManager`, and `CheckInManager`. It shows the flow of actions such as check-in request submission and off-chain validation. The sequence diagram provides a high-level overview of the interactions and the order of operations between the contracts. You can see the `CheckInManager` is the central contract that interacts with the other two contracts, and the sequence of actions for check-in requests and validations.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/Vc7fidHDSz8txJQ5wy6mUH"></iframe>

## Offchain 🐍

The offchain service is a Python application that listens to events on the blockchain and validates the face recognition and geo-location of the users. It uses the [web3](https://github.com/ethereum/web3.py) package to interact with the Ethereum blockchain, the [face_recognition](https://github.com/ageitgey/face_recognition) library to validate the facial recognition of the users and the [geopy](https://github.com/geopy/geopy) library to validate the geo-location of the users. The offchain service is used to validate the check-in requests and ensure the integrity of the data.

## Docker 🐳

### Services 🛠️

List of all services that are in the project and their respective details.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/XBbpRHtAkJwhkaRnwKFDWy"></iframe>

### Environments 🌍

Here you can see the environments of the project and the services that are running in each one, with details of the command and the extended services.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/K26ouFXSN1LEx6sZL6mVDM"></iframe>

### Dependencies 📊

In this diagram you can follow the dependencies of the services and dockerfiles of the project.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/Liunwf1seSmkfHCkLJXJCo"></iframe>

## CI/CD Actions 🔄

Here you can see the CI/CD actions that are running on the project, with the tests, build and deploy of the frontend and offchain services. You can access the Docker auto-tests with the [Github Actions](https://github.com/Bottle-Coders/iPresence/actions) on the [workflow CI](https://github.com/Bottle-Coders/iPresence/actions/workflows/CI.yml).

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/KtKtXfeTCC5NTR4LTFEUAz"></iframe>

### Latest docker tests artifacts logs from the [workflow CI](https://github.com/Bottle-Coders/iPresence/actions/workflows/CI.yml).

```sh
scaffold-test-1  | Downloading compiler 0.8.17
scaffold-test-1  | Compiled 3 Solidity files successfully (evm target: london).
scaffold-test-1  |
scaffold-test-1  |   CheckInManager
scaffold-test-1  |     Check-in Request Submission
scaffold-test-1  |       ✔ Should allow a user to request a check-in
scaffold-test-1  |     Check-in Approval and Rejection
scaffold-test-1  |       ✔ Should allow the offchain validator to approve a check-in
scaffold-test-1  |       ✔ Should allow the offchain validator to reject a check-in
scaffold-test-1  |     Check-in Information Retrieval
scaffold-test-1  |       ✔ Should allow a user to retrieve their check-in requests
scaffold-test-1  |       ✔ Should allow retrieval of all user check-ins for an event
scaffold-test-1  |       ✔ Should allow retrieval of all check-ins for an event
scaffold-test-1  |
scaffold-test-1  |   EventManager
scaffold-test-1  |     Event Creation
scaffold-test-1  |       ✔ Should allow creating a new event
scaffold-test-1  |     Event Updates
scaffold-test-1  |       ✔ Should allow the owner to update the event
scaffold-test-1  |       ✔ Should prevent non-owners from updating the event
scaffold-test-1  |     Event Retrieval
scaffold-test-1  |       ✔ Should allow anyone to retrieve event information
scaffold-test-1  |       ✔ Should allow retrieving all events
scaffold-test-1  |     Event Validation
scaffold-test-1  |       ✔ Should prevent creating events with invalid details
scaffold-test-1  |
scaffold-test-1  |   UserRegistry
scaffold-test-1  |     User Registration
scaffold-test-1  |       ✔ Should allow a new user to register
scaffold-test-1  |       ✔ Should not allow registering with an existing address
scaffold-test-1  |       ✔ Should reject registration with invalid name
scaffold-test-1  |       ✔ Should reject registration with invalid IPFS hash
scaffold-test-1  |     Data Retrieval
scaffold-test-1  |       ✔ Should allow fetching user information by address
scaffold-test-1  |       ✔ Should allow users to fetch their own information
scaffold-test-1  |       ✔ Should revert when fetching non-existent user info
scaffold-test-1  |     Data Update
scaffold-test-1  |       ✔ Should allow a user to update their name
scaffold-test-1  |       ✔ Should allow a user to update their face hash
scaffold-test-1  |
scaffold-test-1  | ·-------------------------------------------|---------------------------|-------------|-----------------------------·
scaffold-test-1  | |           Solc version: 0.8.17            ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 30000000 gas  │
scaffold-test-1  | ············································|···························|·············|······························
scaffold-test-1  | |  Methods                                                                                                          │
scaffold-test-1  | ···················|························|·············|·············|·············|···············|··············
scaffold-test-1  | |  Contract        ·  Method                ·  Min        ·  Max        ·  Avg        ·  # calls      ·  eur (avg)  │
scaffold-test-1  | ···················|························|·············|·············|·············|···············|··············
scaffold-test-1  | |  CheckInManager  ·  replyCheckIn          ·      68620  ·     113034  ·      90827  ·            4  ·          -  │
scaffold-test-1  | ···················|························|·············|·············|·············|···············|··············
scaffold-test-1  | |  CheckInManager  ·  requestCheckIn        ·     269968  ·     287068  ·     281368  ·            3  ·          -  │
scaffold-test-1  | ···················|························|·············|·············|·············|···············|··············
scaffold-test-1  | |  CheckInManager  ·  setOffchainValidator  ·          -  ·          -  ·      26712  ·            1  ·          -  │
scaffold-test-1  | ···················|························|·············|·············|·············|···············|··············
scaffold-test-1  | |  EventManager    ·  createEvent           ·     274705  ·     274957  ·     274873  ·            3  ·          -  │
scaffold-test-1  | ···················|························|·············|·············|·············|···············|··············
scaffold-test-1  | |  EventManager    ·  updateEvent           ·          -  ·          -  ·      62755  ·            1  ·          -  │
scaffold-test-1  | ···················|························|·············|·············|·············|···············|··············
scaffold-test-1  | |  UserRegistry    ·  registerUser          ·     117419  ·     117467  ·     117435  ·            3  ·          -  │
scaffold-test-1  | ···················|························|·············|·············|·············|···············|··············
scaffold-test-1  | |  UserRegistry    ·  updateUserInfo        ·      40895  ·      43611  ·      42253  ·            4  ·          -  │
scaffold-test-1  | ···················|························|·············|·············|·············|···············|··············
scaffold-test-1  | |  Deployments                              ·                                         ·  % of limit   ·             │
scaffold-test-1  | ············································|·············|·············|·············|···············|··············
scaffold-test-1  | |  CheckInManager                           ·          -  ·          -  ·    1150202  ·        3.8 %  ·          -  │
scaffold-test-1  | ············································|·············|·············|·············|···············|··············
scaffold-test-1  | |  EventManager                             ·          -  ·          -  ·    1036111  ·        3.5 %  ·          -  │
scaffold-test-1  | ············································|·············|·············|·············|···············|··············
scaffold-test-1  | |  UserRegistry                             ·          -  ·          -  ·     692525  ·        2.3 %  ·          -  │
scaffold-test-1  | ·-------------------------------------------|-------------|-------------|-------------|---------------|-------------·
scaffold-test-1  |
scaffold-test-1  |   21 passing (2s)
scaffold-test-1  |
```
