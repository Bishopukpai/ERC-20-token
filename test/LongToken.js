const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LongToken contract", function () {
  let Token;
  let longToken;
  let owner;
  let addr1;
  let addr2;

  const tokenCap = 100000000;
  const tokenBlockReward = 50;

  beforeEach(async function () {
    // ✅ Get ContractFactory and signers
    Token = await ethers.getContractFactory("Longtoken");
    [owner, addr1, addr2] = await ethers.getSigners();

    // ✅ Deploy contract and wait for deployment (ethers v6 syntax)
    longToken = await Token.deploy(tokenCap, tokenBlockReward);
    await longToken.waitForDeployment();

    console.log("✅ Deployed to:", await longToken.getAddress());
  });

  describe("Deployment", function () {
    it("should set the right owner", async function () {
      expect(await longToken.owner()).to.equal(owner.address);
    });

    it("should assign the total supply of tokens to the owner", async function () {
      // ✅ Fix typo: addresss → address
      const ownerBalance = await longToken.balanceOf(owner.address);
      const totalSupply = await longToken.totalSupply();
      expect(ownerBalance).to.equal(totalSupply);
    });

    it("should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await longToken.cap();
      // ✅ Use formatEther correctly for ethers v6
      expect(Number(ethers.formatEther(cap))).to.equal(tokenCap);
    });

    it("should set the blockReward to the argument provided during deployment", async function () {
      const blockReward = await longToken.blockReward();
      expect(Number(ethers.formatEther(blockReward))).to.equal(tokenBlockReward);
    });

    it("should fail if sender does not have enough tokens", async function () {
      const initialOwnerBalance = await longToken.balanceOf(owner.address);

      // ✅ Revert check (simplified, because custom errors may vary)
      await expect(longToken.connect(addr1).transfer(owner.address, 1)).to.be.reverted;

      const finalOwnerBalance = await longToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance);
    });

    it("should update balances after transfers", async function () {
      const initialOwnerBalance = await longToken.balanceOf(owner.address);

      // ✅ Transfer tokens
      await longToken.transfer(addr1.address, 100n);
      await longToken.transfer(addr2.address, 50n);

      const finalOwnerBalance = await longToken.balanceOf(owner.address);

      // ✅ BigInt arithmetic
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150n);

      const addr1Balance = await longToken.balanceOf(addr1.address);
      const addr2Balance = await longToken.balanceOf(addr2.address);

      expect(addr1Balance).to.equal(100n);
      expect(addr2Balance).to.equal(50n);
    });
  });
});
