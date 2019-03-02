pragma solidity ^0.5.0;

import { RainbowToken } from "../RainbowToken.sol";


contract RainbowTokenMock is RainbowToken {
  constructor(
    int _r,
    int _g,
    int _b,
    uint winningConstant
  )
    public
    payable
    RainbowToken(_r, _g, _b, winningConstant)
  {
    // Register sender with winning token
    players.push(msg.sender);
    tokens[msg.sender] = Token(targetColor, targetColor, DEFAULT_BLENDING_PRICE);
  }
}
