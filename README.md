# DAO Project

A decentralized autonomous organization (DAO) for proposal creation and voting.

## Features
- Members can create proposals.
- Members can vote on proposals.
- Chairperson can execute approved proposals.

## Setup
1. Install dependencies: `npm install`
2. Deploy contracts: `truffle migrate`
3. Start React app: `cd client && npm start`

Deployment Steps
Start Ganache:

bash
Copy code
ganache-cli
Deploy Contract:

bash
Copy code
truffle migrate --network development
Copy ABI File: Copy DAO.json from build/contracts to client/src/abi/.

Start React App:

bash
Copy code
cd client
npm start
