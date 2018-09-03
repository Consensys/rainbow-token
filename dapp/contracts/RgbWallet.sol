pragma solidity ^0.4.24;

import './Owned.sol';

contract RgbWallet is Owned {

  struct rgb {
    uint r;
    uint g;
    uint b;
  }

  mapping(address => rgb) public wallets;

  address[] public playerList;

  uint startTime;

  /* Throw if the sender is not a player */
  modifier onlyPlayer() {
    require(isPlayer(msg.sender), 'Not a player');
    _;
  }

  /* Throw if the game is over */
  modifier gameInProgress() {
    require(now <= startTime + 1 weeks, 'Game over');
    _;
  }

  /* Throw if the game is not over */
  modifier gameOver() {
    require(now > startTime + 1 weeks, 'Game in progress');
    _;
  }

  /* Emitted each time a player join the game */
  event NewPlayer(address indexed playerAddress);

  /* Emitted each time a blending is realized */
  event Blending(
    address indexed blender,
    uint r,
    uint g,
    uint b
  );

  /* Initializes the owner and the start time */
  constructor() public {
    owner = msg.sender;
    startTime = now;
  }

  /* Sender joins the game */
  function play() gameInProgress public {
    // The sender must not be already a player
    require(!isPlayer(msg.sender), 'Already a player');
    // Register the address in the array of player
    playerList.push(msg.sender);
    // Given the address, derive the corresponding rgb
    uint defaultChoice = uint(msg.sender) % 3;
    rgb memory defaultColor;
    if (defaultChoice == 0) {
      defaultColor = rgb(255, 0, 0);
    } else if (defaultChoice == 1){
      defaultColor = rgb(0, 255, 0);
    } else {
      defaultColor = rgb(0, 0, 255);
    }
    // Assign the address a token of color derived from it
    wallets[msg.sender] = defaultColor;
    // Emit the event
    emit NewPlayer(msg.sender);
  }

  /* Sender blends his token with the one of an other address */
  function blendWithOthers(
    address otherPlayer,
    uint targetRgbR,
    uint targetRgbG,
    uint targetRgbB
  ) gameInProgress onlyPlayer public payable {
    // The sender must at least send 2 ethers
    require(msg.value >= 20 finney, 'Not enough Ether');
    // Get the coin of otherPlayer
    rgb memory otherCoin = wallets[otherPlayer];
    // The color of the target must be the one in argument
    require(targetRgbR == otherCoin.r && targetRgbG == otherCoin.g && targetRgbB == otherCoin.b, 'Target coin has changed');
    // Get the coin of the sender
    rgb storage myCoin = wallets[msg.sender];
    // Blend your coin with the other one
    myCoin.r = (myCoin.r + otherCoin.r) / 2;
    myCoin.g = (myCoin.g + otherCoin.g) / 2;
    myCoin.b = (myCoin.b + otherCoin.b) / 2;
    // Transfer the Ethers
    otherPlayer.transfer(msg.value / 2);
    // Emit the event
    emit Blending(msg.sender, myCoin.r, myCoin.g, myCoin.b);
  }

  /* Sender blends his token with his default rgb code */
  function blendWithYourself() gameInProgress onlyPlayer public payable {
    // The sender must at least send 2 ethers
    require(msg.value >= 20 finney, 'Not enough Ether');
    // Get the default color of the sender
    uint defaultChoice = uint(msg.sender) % 3;
    rgb memory otherCoin;
    if (defaultChoice == 0) {
      otherCoin = rgb(255, 0, 0);
    } else if (defaultChoice == 1){
      otherCoin = rgb(0, 255, 0);
    } else {
      otherCoin = rgb(0, 0, 255);
    }
    // Get the coin of the sender
    rgb storage myCoin = wallets[msg.sender];
    // Blend your coin with the other one
    myCoin.r = (myCoin.r + otherCoin.r) / 2;
    myCoin.g = (myCoin.g + otherCoin.g) / 2;
    myCoin.b = (myCoin.b + otherCoin.b) / 2;
    // Emit the event
    emit Blending(msg.sender, myCoin.r, myCoin.g, myCoin.b);
  }

  /* Get the default rgb code of an address */
  function getDefaultRgb(address player) public pure returns (uint[3]) {
    uint defaultChoice = uint(player) % 3;
    rgb memory defaultRgb;
    if (defaultChoice == 0) {
      defaultRgb = rgb(255, 0, 0);
    } else if (defaultChoice == 1){
      defaultRgb = rgb(0, 255, 0);
    } else {
      defaultRgb = rgb(0, 0, 255);
    }
    return [ defaultRgb.r, defaultRgb.g, defaultRgb.b ];
  }

  /* Get the current rgb code of an address */
  function getCurrentRgb(address player) public view returns (uint[3]) {
    rgb memory currentRgb = wallets[player];
    return [ currentRgb.r, currentRgb.g, currentRgb.b ];
  }

  /* Get the list of players */
  function getPlayers() public view returns (address[]) {
    return playerList;
  }

  /* Check if an address is a player */
  function isPlayer(address _address) public view returns (bool) {
    uint i;
    while (i < playerList.length) {
      if (playerList[i] == _address) {
        return true;
      }
      i++;
    }
    return false;
  }
}
