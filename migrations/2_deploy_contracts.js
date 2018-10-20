const GameManager = artifacts.require('./GameManager.sol');

module.exports = function (deployer) {
    deployer.deploy(GameManager, 44, 86, 221);
};
