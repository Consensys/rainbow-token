pragma solidity ^0.4.24;

/**
 * @title RainbowToken
 *
 * @dev Rainbow Token contract
 * Rainbow Token is a game in which players own a colored token. 
 * Players can change their token color by blending it with another player tokens.
 * Players are required to pay some fee to perform action in the game 
 * Players should try to give their token a target color that is set when deploying game contract
 *
 * Rules:
 * 1. Playing:To start playing a player needs to pay 0.1 ETH fee to the RainbowToken contract
 * 2. Blending: When blending only the color of the player requesting the blend is modified
 *    To blend their token with another player token players must pay a blending price that is set by the player
 *    Half of the amount paid is given to the blending player the other half is given to the Rainbow Token contract
 * 3. Auto Blending: Players can change their token color by blending with their own default color that can be derived from player's address
 *    To auto blend a user should pay 0.01 ETH to Rainbow Token contract
 * 4. Game winner is
 *    - first player to get a token of a target color
 *    - In case the game is over, game winner is the one with minimal score (calculated has the distance of its token color to target color)
 *    If a player successfully claims win, she/he get sall ETH that have been transfered to the Rainbow Token contract during the game
 */
contract RainbowToken {

  struct Color {
    uint r;
    uint g;
    uint b;
  }

  struct Token {
    Color color;
    Color defaultColor;
    uint blendingPrice;
  }

  /* Fee */
  uint constant public PLAYING_FEE = 1000000000000000;
  uint constant public DEFAULT_BLENDING_PRICE = 10000000000000000;

  /* Target color to win game */
  Color public targetColor;

  /* Boolean indicating if a player won the game */
  bool public gameOver = false;

  /* Mapping containing rainbow tokens */
  mapping(address => Token) tokens;

  /* Array listing players */
  address[] players;

  /* Throw if the sender is not a player */
  modifier onlyPlayer() {
    require(isPlayer(msg.sender), 'You are not a player');
    _;
  }

  /* Throw if game is over */
  modifier gameInProgress() {
    require(!isGameOver(), 'Game is over');
    _;
  }

  /* Emitted each time a player join the game */
  event PlayerCreated(
    address indexed player,
    uint r,
    uint g,
    uint b,
    uint blendingPrice
  );

  /* Emitted each time a blending is realized */
  event TokenBlended(
    address indexed player,
    uint r,
    uint g,
    uint b
  );

  /* Emitted each time a player modifies its blending price */
  event BlendingPriceSet(
    address indexed player,
    uint price
  );

  /* Emitted when a player has won */
  event PlayerWon(
    address indexed player
  );

  /**
   * @dev Start a new Rainbow Token game
   * @param _r Target color Red value
   * @param _g Target color Green value
   * @param _b Target color Blue value
   */
  constructor(
    int _r,
    int _g,
    int _b
  )
    public
  { 
    // Set target color
    targetColor = Color(uint(_r), uint(_g), uint(_b));
  }

  /**
   * @dev Get players
   */
  function getPlayers()
    public
    view
    returns (address[])
  {
    return players;
  }

  /**
   * @dev Get token information
   * @param _player Player address
   */
  function getToken(
    address _player
  )
    public
    view
    returns (uint[7])
  {
    Token memory token = tokens[_player];
    return [
      token.color.r, 
      token.color.g, 
      token.color.b, 
      token.defaultColor.r, 
      token.defaultColor.g, 
      token.defaultColor.b, 
      token.blendingPrice
    ];
  }

  /**
   * @dev Check if a player exist
   * @param _player Player address
   */
  function isPlayer(
    address _player
  )
    public
    view
    returns (bool)
  {
    // Blending price can not be set to 0
    return tokens[_player].blendingPrice > 0;
  }

  /**
   * @dev Check if game is over
   */
  function isGameOver()
    public
    view
    returns (bool)
  {
    return gameOver;
  }

  /**
   * @dev Register transaction sender has a new player
   */
  function play()
    public
    payable
    gameInProgress
    returns (bool)
  {
    // The sender must not be already a player
    require(!isPlayer(msg.sender), 'Already a player');

    // Sender must have paid gaming to start playing
    require(msg.value >= PLAYING_FEE, 'Playing fee has not been paid');

    // Compute player default color (try to make it tough for a player to anticipate default color)
    uint defaultColorSeed = uint(keccak256(abi.encodePacked(msg.sender, block.number)));
    Color memory defaultColor = Color(
        ((defaultColorSeed & 1) > 0) ? uint(255): 0, 
        ((defaultColorSeed & 2) > 0) ? uint(255): 0, 
        ((defaultColorSeed & 4) > 0) ? uint(255): 0
    );

    // Register player
    players.push(msg.sender);
    tokens[msg.sender] = Token(defaultColor, defaultColor, DEFAULT_BLENDING_PRICE);

    // Emit event
    emit PlayerCreated(
      msg.sender,
      defaultColor.r, 
      defaultColor.g, 
      defaultColor.b,
      DEFAULT_BLENDING_PRICE
    );

    return true;
  }

  /**
   * @dev Set blending price
   * @param _price New price (must be strictly positive)
   */
  function setBlendingPrice(
    uint _price
  )
     public
     gameInProgress
     onlyPlayer
     returns (bool)
  {
    // Blending price must be positive
    require(_price > 0, 'Blending price should be positive');

    // Set price
    tokens[msg.sender].blendingPrice = _price;

    // Emit event
    emit BlendingPriceSet(
      msg.sender, 
      _price
    );

    return true;
  }

  /**
   * @dev Blend player token with another player token
   * @param _blendingPlayer Player to blend with
   * @param _blendingPrice Blending token price
   * @param _blendingR Blending token Red value
   * @param _blendingG Blending token Green value
   * @param _blendingB Blending token Blue value
   */
  function blend(
    address _blendingPlayer,
    uint _blendingPrice,
    uint _blendingR,
    uint _blendingG,
    uint _blendingB
  )
    public
    payable
    gameInProgress
    onlyPlayer
    returns (bool)
  { 
    // Must blend with a player
    require(isPlayer(_blendingPlayer), 'You must blend with a player');

    // Get token of player to blend with
    Token memory blendingToken = tokens[_blendingPlayer];

    // Ensure blending token price has not increased while transaction was pending
    require(_blendingPrice >= blendingToken.blendingPrice, 'Blending price has increased');

    // The sender must have transfer enough value to blend
    require(msg.value >= blendingToken.blendingPrice, 'Not enought transfered Ether');

    // Ensure blending token color has not been modified while transaction was pending
    require(_blendingR == blendingToken.color.r && _blendingG == blendingToken.color.g && _blendingB == blendingToken.color.b, 'Blending color has changed');

    // Blend current player token
    Token storage token = tokens[msg.sender];
    token.color.r = (token.color.r + blendingToken.color.r) / 2;
    token.color.g = (token.color.g + blendingToken.color.g) / 2;
    token.color.b = (token.color.b + blendingToken.color.b) / 2;

    // Pay blending player
    _blendingPlayer.transfer(msg.value / 2);

    // Emit event
    emit TokenBlended(
      msg.sender,
      token.color.r,
      token.color.g,
      token.color.b
    );

    return true;
  }

  /**
   * @dev Blend with default token color
   */
  function defaultBlend()
    public
    payable
    gameInProgress
    onlyPlayer
    returns (bool)
  {
    // Player needs to transfer minimum blending price
    require(msg.value >= DEFAULT_BLENDING_PRICE, 'Default blending fee has not been paid');

    // Get current player token
    Token storage token = tokens[msg.sender];

    // Blend player token with default color
    token.color.r = (token.color.r + token.defaultColor.r) / 2;
    token.color.g = (token.color.g + token.defaultColor.g) / 2;
    token.color.b = (token.color.b + token.defaultColor.b) / 2;

    // Emit event
    emit TokenBlended(
      msg.sender,
      token.color.r,
      token.color.g,
      token.color.b
    );

    return true;
  }

  /**
   * @dev Current player claim victory
   */
  function claimVictory()
    public
    onlyPlayer
    gameInProgress
    returns (bool)
  {
    // Test player token has a winning color
    Color memory color = tokens[msg.sender].color;
    require(color.r == targetColor.r && color.g == targetColor.g && color.b == targetColor.b, 'Not winner');

    // Transfer winning prize
    msg.sender.transfer(address(this).balance);

    // End game
    gameOver = true;

    // Emit event
    emit PlayerWon(
      msg.sender
    );

    return true;
  } 
}
