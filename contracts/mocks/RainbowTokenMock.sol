pragma solidity ^0.4.24;

import { RainbowToken } from "../RainbowToken.sol";


contract RainbowTokenMock is RainbowToken {
  constructor(
    uint8 _r,
    uint8 _g,
    uint8 _b,
    address _gameManager,
    address _winningPlayer
  )
    public
    payable
    RainbowToken(_r, _g, _b, _gameManager)
  {
    // Register sender with winning token
    players.push(_winningPlayer);
    tokens[_winningPlayer] = Token(targetColor, targetColor, DEFAULT_BLENDING_PRICE);
  }
}
