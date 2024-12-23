import React, { useState, useEffect } from "react";
import Web3 from "web3";
import DAO from "./abi/DAO.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [proposalDescription, setProposalDescription] = useState("");

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DAO.networks[networkId];
      const instance = new web3.eth.Contract(
        DAO.abi,
        deployedNetwork && deployedNetwork.address
      );

      setContract(instance);
    };

    init();
  }, []);

  const createProposal = async () => {
    if (!contract) return;
    await contract.methods.createProposal(proposalDescription).send({ from: account });
    alert("Proposal created!");
    loadProposals();
  };

  const loadProposals = async () => {
    if (!contract) return;
    const proposalsCount = await contract.methods.getProposalsCount().call();
    const loadedProposals = [];
    for (let i = 0; i < proposalsCount; i++) {
      const proposal = await contract.methods.proposals(i).call();
      loadedProposals.push({ ...proposal, id: i });
    }
    setProposals(loadedProposals);
  };

  return (
    <div>
      <h1>DAO Marketplace</h1>
      <div>
        <input
          type="text"
          placeholder="Proposal Description"
          value={proposalDescription}
          onChange={(e) => setProposalDescription(e.target.value)}
        />
        <button onClick={createProposal}>Create Proposal</button>
      </div>
      <div>
        <button onClick={loadProposals}>Load Proposals</button>
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal.id}>
              {proposal.description} | Votes: {proposal.voteCount} | Executed:{" "}
              {proposal.executed ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
