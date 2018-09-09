pragma solidity ^0.4.24;

import { RainbowToken } from '../RainbowToken.sol';

contract RainbowTokenMock is RainbowToken {
  constructor(
    int _r,
    int _g,
    int _b
  )
    public
    payable
    RainbowToken(_r, _g, _b)
  { 
    // Register sender with winning token
    players.push(msg.sender);
    tokens[msg.sender] = Token(targetColor, targetColor, DEFAULT_BLENDING_PRICE);
  }
}