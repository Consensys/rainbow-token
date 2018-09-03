var RgbWallet = artifacts.require("./RgbWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(RgbWallet);
};
