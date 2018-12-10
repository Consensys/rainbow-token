pragma solidity ^0.4.24;

import './RainbowTokenMock.sol';

/**
  * @title GameManager
  *
  * @dev GameManager contract
  *
  * The game manager keeps track of the current game and creates a new one if
  * the previous one ends
  */
contract GameManagerMock {

  /* Current address of the game */
  address public gameAddress;

  /* Target color */
  uint8 public r;
  uint8 public g;
  uint8 public b;

  /* Winning player address */
  address public winningPlayer;

  /* Emitted every time a new game is deployed */
  event NewGame(address newGameAddress);

  /**
    * @dev Creates a new manager with a new game
    * @param _r Uint of the target r
    * @param _g Uint of the target g
    * @param _b Uint of the target b
    * @param _winningPlayer Address of the winning player
    */
  constructor(
    uint8 _r,
    uint8 _g,
    uint8 _b,
    address _winningPlayer
  )
    public
  {
    // Set the state variables
    r = _r;
    g = _g;
    b = _b;
    winningPlayer = _winningPlayer;

    // Create a new game
    require(newRainbowToken(), 'Not able to generate a new game');
  }

  /**
   * @dev Claim victory of the current game and create a new game
   */
  function claimVictory()
    public
    returns (bool)
  {
    // Save the game
    RainbowToken game = RainbowToken(gameAddress);

    // The sender must be a player
    require(game.isPlayer(msg.sender), 'The sender is not a player.');

    // Call the claimVictory of the game
    require(game.claimVictory(msg.sender), 'Unable to claim victory.');

    // Create a new game
    require(newRainbowToken(), 'Unable to create a new game');

    return true;
  }

  /**
   * @dev Creates a new game
   */
  function newRainbowToken()
    private
    returns (bool)
  {
    // Create the new game
    RainbowToken newGame = new RainbowTokenMock(
      r,
      g,
      b,
      address(this),
      winningPlayer
    );

    // Register the new address
    gameAddress = address(newGame);

    // Emit the event
    emit NewGame(gameAddress);

    return true;
  }
}
