const { waffle, ethers, getNamedAccounts } = require("hardhat");
const hre = require("hardhat");
const { deploy } = require("../scripts/deploy");


//BuyMeACoffee deployed to 0x70810Ac42f80877EeEA1E59299994672c6BcfBc3
async function getBalance(address) {
  const balance = await hre.waffle.provider.getBalance(address);
  return ethers.utils.formatUnits(balance);
}

async function printAddressBalance(addresses) {
  for (let element of addresses) {
    console.log(`Address ${element} balance: ${await getBalance(element)}`);
  }
}

async function printMemos(memo) {
  memo.forEach((el) => {
    console.log(`At ${el.timestamp}, ${el.name}, ${el.from}, ${el.message}`);
  });
}

async function main() {
  const [deployer, tipper1, tipper2, tipper3] = await hre.ethers.getSigners();

  //Get the contract to deploy & deploy that contract
  const buyMeACoffee = await deploy();
  
  //check balances before the coffee purchase.
  const address = [
    deployer.address,
    tipper1.address,
    tipper2.address,
    tipper3.address,
    buyMeACoffee.address,
  ];
  console.log("=== start ===");
  await printAddressBalance(address);

  // buy the owner a few coffee
  const tip = { value: hre.ethers.utils.parseEther("1") };
  await buyMeACoffee.connect(tipper1).buyCoffee("harsh", "YO", tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("Sarah", "love", tip);
  await buyMeACoffee.connect(tipper3).buyCoffee("ME", "Strong", tip);

  //check balance after coffee purcahse
  console.log("=== Bought coffee ===");
  await printAddressBalance(address);

  // Withdraw funds
  await buyMeACoffee.connect(deployer).withdrawTips();

  // check balance after withdraw
  await printAddressBalance(address);

  // Read all the memos left for the owner
  console.log("== memos ==");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
