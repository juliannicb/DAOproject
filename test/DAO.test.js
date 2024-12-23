const DAO = artifacts.require("DAO");

contract("DAO", (accounts) => {
  const chairperson = accounts[0];
  const member = accounts[1];

  it("should allow the chairperson to add a member", async () => {
    const instance = await DAO.deployed();
    await instance.addMember(member, { from: chairperson });
    const isMember = await instance.members(member);
    assert.isTrue(isMember, "Member not added");
  });

  it("should allow members to create proposals", async () => {
    const instance = await DAO.deployed();
    await instance.createProposal("New Proposal", { from: member });
    const proposalsCount = await instance.getProposalsCount();
    assert.equal(proposalsCount, 1, "Proposal not created");
  });

  it("should allow members to vote on proposals", async () => {
    const instance = await DAO.deployed();
    await instance.vote(0, { from: member });
    const proposal = await instance.proposals(0);
    assert.equal(proposal.voteCount, 1, "Vote not counted");
  });

  it("should allow the chairperson to execute proposals", async () => {
    const instance = await DAO.deployed();
    await instance.executeProposal(0, { from: chairperson });
    const proposal = await instance.proposals(0);
    assert.isTrue(proposal.executed, "Proposal not executed");
  });
});
