const { assert } = require("chai");
const { ethers, getNamedAccounts, network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat.config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("BuyMeACoffee", async () => {
      let contract;
      const { deployer } = await getNamedAccounts();
      beforeEach(async () => {
        await deployments.fixture(["all"]);
        contract = await ethers.getContract("BuyMeACoffee", deployer);
      });

      describe("constructor", async () => {
        it("owner variable is storing the address of owner", async () => {
          const owner = await contract.getOwner();
          assert.equal(deployer, owner);
        });
      });
    });
