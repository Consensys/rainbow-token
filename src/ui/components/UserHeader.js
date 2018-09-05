// import React from 'react';

// import Button from '@material-ui/core/Button';

// const UserHeader = ({
//   currentPlayer,
//   inProgress,
//   blend,
//   setBlendingPrice,
// }) => (
//   <div style={{ margin: 'auto', width: '90%' }}>
//     <div style={{ marginTop: '2em', marginBottom: '4em', display: 'flex', justifyContent: 'space-around' }}>
//       <span style={{ fontSize: '1.3em' }}>Welcome <strong>{currentPlayer.pseudo}</strong></span>
//       <span>address: {currentPlayer.address.substring(0,10)}...</span>
//     </div>
//     <div style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between' }}>
//       <div style={{ display: 'flex', flexDirection:'row'}}>
//         <span>
//           Default Color: RGB({currentPlayer.token.defaultColor.r}, {currentPlayer.token.defaultColor.g}, {currentPlayer.token.defaultColor.b})
//         </span>
//         <span style={{ display:'inline-block', marginLeft: '1em', width: '20px', height: '20px', background: `rgb(${currentPlayer.token.defaultColor.r}, ${currentPlayer.token.defaultColor.g}, ${currentPlayer.token.defaultColor.b})`, borderRadius:'50%', boxShadow: '.3px .3px black' }}>
//         </span>
//       </div>
//       <div style={{ display: 'flex', flexDirection:'row', fontSize: '1.2em'}}>
//         <span>Current Token Color: RGB({currentPlayer.token.color.r}, {currentPlayer.token.color.g}, {currentPlayer.token.color.b})</span>
//         <span style={{ display:'inline-block', marginLeft: '1em', width: '20px', height: '20px', background: `rgb(${currentPlayer.token.color.r}, ${currentPlayer.token.color.g}, ${currentPlayer.token.color.b})`, borderRadius:'50%', boxShadow: '.3px .3px black' }}></span>
//       </div>
//       <Button variant='contained' color='primary' onClick={e => {e.preventDefault(); blend();}} disabled={inProgress}>
//         Blend with your default Color
//       </Button>
//     </div>
//   </div>
// )

import React, { Component } from 'react';
import Web3 from 'web3';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import PriceDialog from './PriceDialog';
import BlendingDialog from './BlendingDialog';

// import rainbowToken from '../svg/RainbowTokenWorkshop.svg';
import rainbowToken from '../../static/svg/CircleTokenRainbow.svg';

const headerUserStyle = {
  all: {
    color: 'white',
    textShadow: '0px 0px 4px rgb(10, 10, 10)',
    margin: 'auto',
    width: '100%',
    height: '30%'
  }
}

class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blendingPriceInput: Web3.utils.fromWei(props.currentPlayer.token.blendingPrice, 'ether'),
      priceDialogOpen: false,
      blendDialogOpen: false
    };
  }

  handleClickPriceOpen = () => {
    this.setState({ priceDialogOpen: true });
  };

  handlePriceClose = () => {
    this.setState({ priceDialogOpen: false });
  };

  handleClickBlendOpen = () => {
    this.setState({ blendDialogOpen: true });
  };

  handleBlendClose = () => {
    this.setState({ blendDialogOpen: false });
  };

  handleChange = e => {
    console.log("Handle Change", e.target)
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {
      currentPlayer,
      inProgress,
      blend,
      setBlendingPrice
    } = this.props;
    const {
      priceDialogOpen,
      blendDialogOpen,
      blendingPriceInput
    } = this.state;
    return (
      <div style={ headerUserStyle.all }>
        <PriceDialog
          blendingPriceInput={blendingPriceInput}
          priceDialogOpen={priceDialogOpen}
          handleClose={this.handlePriceClose}
          handleChange={this.handleChange}
          setBlendingPrice={setBlendingPrice}
        />
        <BlendingDialog
          blendDialogOpen={blendDialogOpen}
          handleClose={this.handleBlendClose}
          blend={blend}
          color={currentPlayer.token.color}
          blendingColor={currentPlayer.token.defaultColor}
          withSelf={true}
          blendingPrice={'0.01'}
        />
        <div style={{ marginTop: '1em', marginBottom: '1em', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{ fontSize: '1.3em', textTransform: 'capitalize' }}>
              Welcome <strong>{currentPlayer.pseudo}</strong>
            </div>
            <div style={{ marginTop: '0.5em', textAlign: 'left' }}>
              Address: {currentPlayer.address.substring(0,6)}...{currentPlayer.address.substring(39, 42)}
            </div>
          </div>
          <Tooltip disableFocusListener disableTouchListener title={`RGB(44, 86, 221)`} placement="right">
            <div style={{ backgroundImage: `url(${rainbowToken})`, width: '60px', height: '60px', backgroundColor: `rgb(44, 86, 221)`, borderRadius:'50%', boxShadow: '1.6px 1.6px rgba(10, 10, 10, 0.9)', border: '1.2px solid rgb(50, 50, 50)' }}></div>
          </Tooltip>
          <div style={{ fontSize: '1.3em', textAlign: 'right' }}>
            Reach the blue<br/> <strong>Consensys</strong> Token
          </div>
        </div>
        <hr className='rainbow2' />
        <div style={{ display:'flex', flexDirection:'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', fontSize: '1.1em' }}>
            <div style={{ marginBottom: '1em' }}>
              Your Default Token
            </div>
            <Tooltip disableFocusListener disableTouchListener title={`RGB(${currentPlayer.token.defaultColor.r}, ${currentPlayer.token.defaultColor.g}, ${currentPlayer.token.defaultColor.b})`} placement="right">
              <div style={{ backgroundImage: `url(${rainbowToken})`, width: '60px', height: '60px', backgroundColor: `rgb(${currentPlayer.token.defaultColor.r}, ${currentPlayer.token.defaultColor.g}, ${currentPlayer.token.defaultColor.b})`, borderRadius:'50%', boxShadow: '1.6px 1.6px rgba(10, 10, 10, 0.9)', border: '1px solid rgb(50, 50, 50)' }}></div>
            </Tooltip>
            <Button
              style={{ fontSize: '0.7em', height: '30px', marginTop:'1em' }}
              variant='contained'
              color='primary'
              onClick={this.handleClickBlendOpen}
              disabled={inProgress}
            >
              Blend with your default color
            </Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '1.3em' }}>
            <div style={{ marginBottom: '1em' }}>
              Your Current Token
            </div>
            <Tooltip disableFocusListener disableTouchListener title={`RGB(${currentPlayer.token.color.r}, ${currentPlayer.token.color.g}, ${currentPlayer.token.color.b})`} placement="right">
              <div style={{ marginBottom: '1em', backgroundImage: `url(${rainbowToken})`, width: '80px', height: '80px', backgroundColor: `rgb(${currentPlayer.token.color.r}, ${currentPlayer.token.color.g}, ${currentPlayer.token.color.b})`, borderRadius:'50%', boxShadow: '2px 2px rgba(10, 10, 10, 0.9)', border: '1.2px solid rgb(50, 50, 50)' }}></div>
            </Tooltip>
            <div style={{ width: '100%', fontSize: '0.6em' }}>{currentPlayer.score} % <progress style={{ marginLeft: '1em', width: '60%' }} value={currentPlayer.score} max='100'>{currentPlayer.score} %</progress></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '1em' }}>
              Set your price
            </div>
            <div style={{ fontSize: '1.5em', marginTop: '1em' }}>
              {Web3.utils.fromWei(currentPlayer.token.blendingPrice, 'ether')} <i className="fab fa-ethereum"></i>
            </div>
            <Button
              style={{ height: '30px', marginTop: '1.8em', fontSize: '0.8em' }}
              variant='contained'
              color='primary'
              onClick={this.handleClickPriceOpen}
              disabled={inProgress}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default UserHeader;
