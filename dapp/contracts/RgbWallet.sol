pragma solidity ^0.4.24;

contract RainbowToken {

  struct Rgb {
    uint r;
    uint g;
    uint b;
  }

  struct Token {
    uint blendingPrice;
    Rgb defaultRgb;
    Rgb currentRgb;
  }

  /* Default blendign price is 0.01 ETH */
  uint constant DEFAULT_BLENDING_PRICE = 10000000000000000;

  /* Contract administrator */
  address admin;

  uint stopTime;

  /* Target color to reach */
  Rgb targetRgb;

  /* Token */
  mapping(address => Token) public tokens;
  address[] public playerList;

  modifier onlyAdmin() {
    require(msg.sender == admin, 'Only administrator');
    _;
  }

  /* Throw if the sender is not a player */
  modifier onlyPlayer() {
    require(isPlayer(msg.sender), 'You are not a player');
    _;
  }

  /* Throw if the game is over */
  modifier gameInProgress() {
    require(isGameInProgress(), 'Game over, ask admin to re-activate game');
    _;
  }

  /* Emitted each time a player join the game */
  event PlayerCreated(address indexed player);

  /* Emitted each time a blending is realized */
  event TokenBlended(
    address indexed blender,
    uint r,
    uint g,
    uint b
  );

  /* Emitted each time a player modifies its interaction price */
  event BlendingPriceUpdated(
    address indexed player,
    uint price
  );

  /* Initializes the owner and the start time */
  constructor(
    uint _r,
    uint _g,
    uint _b,
    uint _time
  ) 
    public
  {
    admin = msg.sender;
    require(_r < 256 && _g < 256 && _b < 256, 'Target color is not valid');
    targetRgb = Rgb(_r, _g, _b);
    stopTime = now +  _time * 1 seconds;
  }

   /* Get the list of players */
  function getPlayers() 
    public 
    view 
    returns (address[]) 
  {
    return playerList;
  }

  /* Get the price of interaction of an address */
  function getBlendingPrice(
    address _player
  ) 
    public 
    view 
    returns (uint) 
  {
    return tokens[_player].blendingPrice;
  }

  /* Check if an address is a player */
  function isPlayer(
    address _player
  ) 
    public 
    view 
    returns (bool) 
  {
    return tokens[_player].blendingPrice > 0;
  }

  function isGameInProgress() 
    public
    view
    returns (bool)
  {
    return stopTime - now > 0;
  } 

  function updateTimer(uint _time) 
    public
    onlyAdmin
    returns (bool)
  {
    stopTime = now + _time * 1 seconds;
    return true;
  }

  function timeRemaining()
    public
    view
    returns (uint) 
  {
    return stopTime - now;
  }

  function computeDefaultRgb(
    address _player
  ) 
    public 
    pure 
    returns (uint[3]) 
  {
    if (uint(_player) % 3 == 0) {
      return [uint(255), 0, 0];
    } else if (uint(_player) % 3 == 1) {
      return [0, uint(255), 0];
    } else {
      return [0, 0, uint(255)];
    }
  }

    /* Get the current rgb code of an address */
  function getCurrentRgb(
    address _player
  ) 
    public 
    view 
    returns (uint[3]) 
  {
    Rgb memory rgb = tokens[_player].currentRgb;
    return [rgb.r, rgb.g, rgb.b];
  }

  /* Get the current rgb code of an address */
  function getDefaultRgb(
    address _player
  ) 
    public 
    view 
    returns (uint[3]) 
  {
    Rgb memory rgb = tokens[_player].defaultRgb;
    return [rgb.r, rgb.g, rgb.b];
  }

  /* Sender joins the game */
  function play() 
    public
    gameInProgress
    returns (bool)  
  {
    // The sender must not be already a player
    require(!isPlayer(msg.sender), 'Already a player');
    
    // Given the address, derive the corresponding rgb
    // Assign the address a token of color derived from it
    uint[3] memory defaultRgb = computeDefaultRgb(msg.sender);
    Rgb memory initialRgb =  Rgb(defaultRgb[0], defaultRgb[1], defaultRgb[2]);
  
    // Register the address in the array of player with blending price at 
    tokens[msg.sender] = Token(DEFAULT_BLENDING_PRICE, initialRgb, initialRgb);
    playerList.push(msg.sender);

    // Emit the event
    emit PlayerCreated(msg.sender);

    return true;
  }

  /* Set your interaction price with others */
  /*TODO: setBlendingPrice */
  function updateBlendingPrice(
    uint _price
  )
     public
     onlyPlayer
     gameInProgress
     returns (bool)
  { 
    require(_price > 0, 'You should set a positive blending price');
    
    tokens[msg.sender].blendingPrice = _price;
    
    emit BlendingPriceUpdated(msg.sender, _price);
    return true;
  }

  /* Sender blends his token with the one of an other address */
  function blend(
    address _blendingPlayer,
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
    // Get the coin of otherPlayer
    Token memory blendingToken = tokens[_blendingPlayer];

    // The sender must at least send the blendingPrice of the other player
    require(msg.value >= blendingToken.blendingPrice, 'Not enough Ether');

    // The color of the target must not have been modified while blending transaction is transmitted
    require(_blendingR == blendingToken.currentRgb.r && _blendingG == blendingToken.currentRgb.g && _blendingB == blendingToken.currentRgb.b, 'Target coin has changed');
    
    // Get the coin of the sender
    Token storage token = tokens[msg.sender];

    // Blend your coin with the other one
    token.currentRgb.r = (token.currentRgb.r + blendingToken.currentRgb.r) / 2;
    token.currentRgb.g = (token.currentRgb.g + blendingToken.currentRgb.g) / 2;
    token.currentRgb.b = (token.currentRgb.b + blendingToken.currentRgb.b) / 2;

    // Transfer the Ethers
    _blendingPlayer.transfer(msg.value / 2);

    // Emit the event
    emit TokenBlended(msg.sender, token.currentRgb.r, token.currentRgb.g, token.currentRgb.b);

    return true;
  }

  /* Sender blends his token with his default rgb code */
  function blend() 
    public
    payable
    gameInProgress 
    onlyPlayer 
    returns (bool)
  {
    // The sender must at least send 0.01 ethers
    require(msg.value >= DEFAULT_BLENDING_PRICE, 'Not enough Ether');

    // Get the default color of the sender
     // Get the coin of the sender
    Token storage token = tokens[msg.sender];

    // Blend your coin with the other one
    token.currentRgb.r = (token.currentRgb.r + token.defaultRgb.r) / 2;
    token.currentRgb.g = (token.currentRgb.g + token.defaultRgb.g) / 2;
    token.currentRgb.b = (token.currentRgb.b + token.defaultRgb.b) / 2;

    // Emit the event
    emit TokenBlended(msg.sender, token.currentRgb.r, token.currentRgb.g, token.currentRgb.b);

    return true;
  }

  function claimVictory() 
    public
    onlyPlayer
    returns (bool)
  { 
    if (isGameInProgress() && computeScore(msg.sender) == 0) {
      msg.sender.transfer(address(this).balance);
      return true;
    } else if (!isGameInProgress()) {
      /* Ensure player is a winner */
      require(computeScore(msg.sender) == computeWinningScore(), 'You are not the winner');

      /* Transfer Eth to winner*/
      msg.sender.transfer(address(this).balance);

      return true;
    }
    return false;
  }

  function computeScore(
    address _player
  ) 
    internal 
    view 
    returns (int) 
  {
    Rgb memory rgb = tokens[_player].currentRgb;
    int targetR  = int(targetRgb.r);
    int targetG = int(targetRgb.g);
    int targetB = int(targetRgb.b);
    int scoreR = (int(rgb.r) - targetR) * (int(rgb.r) - targetR);
    int scoreG = (int(rgb.g) - targetG) * (int(rgb.g) - targetG);
    int scoreB = (int(rgb.b) - targetB) * (int(rgb.b) - targetB);

    return (scoreR + scoreG + scoreB);
  }

  function computeWinningScore()
    internal
    view
    returns (int) 
  {
    int minScore = 0xffffff;
    for (uint i; i < playerList.length; i++) {
      int score = computeScore(playerList[i]);
      if (score < minScore) {
        minScore = score;
      }
    }    
    return minScore;
  }
}
