
const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const { developmentChains } = require("../helper-hardhat.config");


async  function deployBuyMeACoffee(){
  const {getNamedAccounts,deployments} = hre;
  const {deployer} = await getNamedAccounts();
  const{deploy,log} = deployments;

  const BuyMeACoffee =await deploy("BuyMeACoffee",{
    from: deployer,
    args:[],
    log:true,
    waitConfirmations:network.config.waitConfirmations||1,
  })
  // if(!developmentChains.includes(network.name)){
  //   log("Verifying....")
  //   await verify(BuyMeACoffee.address,[]);
  // }
  log("________________________deployed______________________")
  return BuyMeACoffee;
}
module.exports = {deployBuyMeACoffee}
module.exports.tags = ["all"];