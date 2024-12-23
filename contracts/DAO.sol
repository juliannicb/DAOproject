// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {
    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
    }

    address public chairperson;
    mapping(address => bool) public members;
    Proposal[] public proposals;

    modifier onlyChairperson() {
        require(msg.sender == chairperson, "Not chairperson");
        _;
    }

    modifier onlyMember() {
        require(members[msg.sender], "Not a member");
        _;
    }

    constructor() {
        chairperson = msg.sender;
        members[msg.sender] = true; // Chairperson is a member by default
    }

    function addMember(address member) public onlyChairperson {
        members[member] = true;
    }

    function createProposal(string memory description) public onlyMember {
        proposals.push(Proposal({ description: description, voteCount: 0, executed: false }));
    }

    function vote(uint256 proposalIndex) public onlyMember {
        require(!proposals[proposalIndex].executed, "Proposal already executed");
        proposals[proposalIndex].voteCount += 1;
    }

    function executeProposal(uint256 proposalIndex) public onlyChairperson {
        require(proposals[proposalIndex].voteCount > 0, "No votes for the proposal");
        require(!proposals[proposalIndex].executed, "Proposal already executed");
        proposals[proposalIndex].executed = true;
    }

    function getProposalsCount() public view returns (uint256) {
        return proposals.length;
    }
}
