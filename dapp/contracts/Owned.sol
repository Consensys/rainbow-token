pragma solidity ^0.4.24;

contract Owned {

  address public owner;

  modifier onlyOwner() {
    require(msg.sender == owner, 'Authorization denied, only owner');
    _;
  }

  constructor() internal {
    owner = msg.sender;
  }
}
