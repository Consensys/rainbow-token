import React, { Component } from 'react';
import Web3 from 'web3';

import Button from '@material-ui/core/Button';

import PriceDialog from './PriceDialog';
import BlendingDialog from './BlendingDialog';
import Token from './Token';

import { headerUserStyle } from '../styles';

class UserHeader extends Component {
    constructor (props) {
        super(props);
        this.state = {
            blendingPriceInput: Web3.utils.fromWei(props.currentPlayer.token.blendingPrice, 'ether'),
            priceDialogOpen: false,
            blendDialogOpen: false,
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
      this.setState({
          [e.target.name]: e.target.value,
      });
  }

  render () {
      const {
          currentPlayer,
          inProgress,
          blend,
          setBlendingPrice,
      } = this.props;
      const {
          priceDialogOpen,
          blendDialogOpen,
          blendingPriceInput,
      } = this.state;
      return (
          <div style={ headerUserStyle.global }>
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
            <div style={headerUserStyle.halfHeader}>
              <div style={headerUserStyle.flexColumn}>
                <div style={headerUserStyle.pseudo}>
                  Welcome <strong>{currentPlayer.pseudo}</strong>
                </div>
                <div style={headerUserStyle.address}>
                  Address: {currentPlayer.address.substring(0, 6)}...{currentPlayer.address.substring(39, 42)}
                </div>
              </div>
              <Token
                color={{ r:44, g: 86, b: 221 }}
                size='60'
                boxShadowSize='1.6'
                borderSize='1.2'
              />
              <div style={headerUserStyle.consensysRightEl}>
                Reach the blue<br/> <strong>Consensys</strong> Token
              </div>
            </div>
            <hr className='rainbow2' />
            <div style={headerUserStyle.halfHeader}>
              <div style={headerUserStyle.flexColumnCentered}>
                <div style={headerUserStyle.defaultTokenTitle}>
                  Your Default Token
                </div>
                <Token
                  color={currentPlayer.token.defaultColor}
                  size='60'
                  boxShadowSize='1.6'
                  borderSize='1.2'
                />
                <Button
                  style={headerUserStyle.defaultTokenBtn}
                  variant='contained'
                  color='primary'
                  onClick={this.handleClickBlendOpen}
                  disabled={inProgress}
                >
                  Blend with your default color
                </Button>
              </div>
              <div style={headerUserStyle.flexColumnCentered}>
                <div style={headerUserStyle.currentTokenTitle}>
                  Your Current Token
                </div>
                <Token
                  color={currentPlayer.token.color}
                  size='80'
                  boxShadowSize='2'
                  borderSize='1.2'
                />
                <div style={headerUserStyle.currentTokenProgress}>
                  {currentPlayer.score} %
                  <progress
                    style={headerUserStyle.currentTokenBar}
                    value={currentPlayer.score}
                    max='100'
                  >
                      {currentPlayer.score} %
                  </progress>
                </div>
              </div>
              <div style={headerUserStyle.flexColumnCentered}>
                <div style={headerUserStyle.priceTitle}>
                  Set your price
                </div>
                <div style={headerUserStyle.priceText}>
                  {Web3.utils.fromWei(currentPlayer.token.blendingPrice, 'ether')} <i className="fab fa-ethereum"></i>
                </div>
                <Button
                  style={headerUserStyle.priceBtn}
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
      );
  }
}

export default UserHeader;
