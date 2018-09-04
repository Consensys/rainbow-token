pragma solidity ^0.4.24;

/**
 * @title RainbowToken
 *
 * @dev Rainbow Token contract
 * Rainbow Token is a game where players own a unique colored token that they should. Players can 
 * change their token color by blending it with other players tokens (by avering each RGB dimension). 
 * Players should try to give their token a target color that is set when deploying game contract
 *
 * Rules:
 * 1. Playing: To start playing a user needs to pay 0.01 ETH to the RainbowToken contract
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

  /* Default blending price is 0.01 ETH */
  uint constant public DEFAULT_BLENDING_PRICE = 10000000000000000;

  /* End time of the game */
  uint public endTime;

  /* Target color to win game */
  Color public targetColor;

  /* Tokens and players registries */
  mapping(address => Token) private tokens;
  address[] public players;

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
    address indexed player
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
   * @param _time Time the game should last (in seconds)
   */
  constructor(
    uint _r,
    uint _g,
    uint _b,
    uint _time
  ) 
    public
  {
    require(_r < 256 && _g < 256 && _b < 256, 'Target color is not valid');
    targetColor = Color(_r, _g, _b);
    endTime = now +  _time * 1 seconds;
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
    onlyPlayer
    returns (uint, uint, uint, uint, uint, uint, uint) 
  { 
    Token memory token = tokens[_player];
    return (token.color.r, token.color.g, token.color.b, token.defaultColor.r, token.defaultColor.g, token.defaultColor.b, token.blendingPrice);
  }


  /**
   * @dev Check if game is over
   */
  function isGameOver() 
    public
    view
    returns (bool)
  {
    return now > endTime;
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
    
    // Sender must have paid default price to start playing
    require(msg.value >= DEFAULT_BLENDING_PRICE, 'You must pay to start playing');

    // Given player address, derive the corresponding initial color
    Color memory initialColor;
    if (uint(msg.sender) % 3 == 0) {
      initialColor =  Color(255, 0, 0);
    } else if (uint(msg.sender) % 3 == 1) {
      initialColor =  Color(0, 255, 0);
    } else {
      initialColor =  Color(0, 0, 255);
    }
  
    // Register player and rainbow token
    players.push(msg.sender);
    tokens[msg.sender] = Token(initialColor, initialColor, DEFAULT_BLENDING_PRICE);
    
    // Emit event
    emit PlayerCreated(msg.sender);

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
     onlyPlayer
     gameInProgress
     returns (bool)
  { 
    require(_price > 0, 'Blending price should be positive');
    
    tokens[msg.sender].blendingPrice = _price;
    
    emit BlendingPriceSet(msg.sender, _price);

    return true;
  }

  /**
   * @dev Blend current player token with another player token
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
    // Get token of player to blend with
    Token memory blendingToken = tokens[_blendingPlayer];

    // Ensure blending token price has not increased while transaction was pending
    require(_blendingPrice >= blendingToken.blendingPrice, "Blending price has increased");

    // The sender must have transfer enough value to blend
    require(msg.value >= blendingToken.blendingPrice, 'Not enought transfered Ether');

    // Ensure blending token color has not been modified while transaction was pending
    require(_blendingR == blendingToken.color.r && _blendingG == blendingToken.color.g && _blendingB == blendingToken.color.b, 'Blending color has changed');

    // Get token of the current player
    Token storage token = tokens[msg.sender];

    // Blend current player token
    token.color.r = (token.color.r + blendingToken.color.r) / 2;
    token.color.g = (token.color.g + blendingToken.color.g) / 2;
    token.color.b = (token.color.b + blendingToken.color.b) / 2;

    // Transfer value to blending player
    _blendingPlayer.transfer(msg.value / 2);

    emit TokenBlended(
      msg.sender, 
      token.color.r, 
      token.color.g, 
      token.color.b
    );

    return true;
  }

  /**
   * @dev Blend current player token with default token color
   */
  function blend() 
    public
    payable
    gameInProgress 
    onlyPlayer 
    returns (bool)
  {
    // Player needs to transfer minimum blending price 
    require(msg.value >= DEFAULT_BLENDING_PRICE, 'Not enough Ether');

    // Get current player token
    Token storage token = tokens[msg.sender];

    // Blend current player token with its default color
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
    returns (bool)
  { 
    // Compute current player score
    int score = computeScore(msg.sender);

    // Ensure either current player token has target color or game is over and player has a token with winning score
    require(score == 0 || (isGameOver() && score == computeWinningScore()), 'You are not winner');
    
    // Transfer winning prize
    msg.sender.transfer(address(this).balance);

    // Emit event
    emit PlayerWon(msg.sender);

    return true;
  }

  /**
   * @dev Compute player score has the distance to the target color
   * @param _player Player address
   */
  function computeScore(
    address _player
  ) 
    public
    view
    returns (int) 
  {
    int targetR  = int(targetColor.r);
    int targetG = int(targetColor.g);
    int targetB = int(targetColor.b);

    Color memory color = tokens[_player].color;
    int scoreR = (int(color.r) - targetR) * (int(color.r) - targetR);
    int scoreG = (int(color.g) - targetG) * (int(color.g) - targetG);
    int scoreB = (int(color.b) - targetB) * (int(color.b) - targetB);

    return (scoreR + scoreG + scoreB);
  }

  /**
   * @dev Compute winning score has the minimum score of every players
   */
  function computeWinningScore()
    public
    view
    returns (int) 
  {
    int minScore = 0xffffff;
    for (uint i; i < players.length; i++) {
      int score = computeScore(players[i]);
      if (score < minScore) {
        minScore = score;
      }
    }    
    return minScore;
  }
}
