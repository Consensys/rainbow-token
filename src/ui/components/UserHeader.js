import React, { Component } from 'react';
import Web3 from 'web3';

/* Material ui components */
import Button from '@material-ui/core/Button';

/* Components */
import PriceDialog from './PriceDialog';
import BlendingDialog from './BlendingDialog';
import Token from './Token';

/* Styles */
import { headerUserStyle } from '../styles';
import { withStyles } from "@material-ui/core/styles";

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
          classes
      } = this.props;
      const {
          priceDialogOpen,
          blendDialogOpen,
          blendingPriceInput,
      } = this.state;
      return (
          <div className={ classes.global }>
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
            <div className={classes.halfHeader}>
              <div className={classes.flexColumn}>
                <div className={classes.pseudo}>
                  Welcome <strong>{currentPlayer.pseudo}</strong>
                </div>
                <div className={classes.address}>
                  Address: {currentPlayer.address.substring(0, 6)}...{currentPlayer.address.substring(39, 42)}
                </div>
              </div>
              <Token
                color={{ r:44, g: 86, b: 221 }}
                size='60'
                boxShadowSize='1.6'
                borderSize='1.2'
              />
              <div className={classes.consensysRightEl}>
                Reach the blue<br/> <strong>Consensys</strong> Token
              </div>
            </div>
            <hr className='rainbow2' />
            <div className={classes.halfHeader}>
              <div className={classes.flexColumnCentered}>
                <div className={classes.defaultTokenTitle}>
                  Your Default Token
                </div>
                <Token
                  color={currentPlayer.token.defaultColor}
                  size='60'
                  boxShadowSize='1.6'
                  borderSize='1.2'
                />
                <Button
                  className={classes.defaultTokenBtn}
                  variant='contained'
                  color='primary'
                  onClick={this.handleClickBlendOpen}
                  disabled={inProgress !== undefined}
                >
                  Blend with your default color
                </Button>
              </div>
              <div className={classes.flexColumnCentered}>
                <div className={classes.currentTokenTitle}>
                  Your Current Token
                </div>
                <Token
                  color={currentPlayer.token.color}
                  size='80'
                  boxShadowSize='2'
                  borderSize='1.2'
                />
                <div className={classes.currentTokenProgress}>
                  {currentPlayer.score} %
                  <progress
                    className={classes.currentTokenBar}
                    value={currentPlayer.score}
                    max='100'
                  >
                      {currentPlayer.score} %
                  </progress>
                </div>
              </div>
              <div className={classes.flexColumnCentered}>
                <div className={classes.priceTitle}>
                  Set your price
                </div>
                <div className={classes.priceText}>
                  {Web3.utils.fromWei(currentPlayer.token.blendingPrice, 'ether')} <i className="fab fa-ethereum"></i>
                </div>
                <Button
                  className={classes.priceBtn}
                  variant='contained'
                  color='primary'
                  onClick={this.handleClickPriceOpen}
                  disabled={inProgress !== undefined}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
      );
  }
}

export default withStyles(headerUserStyle)(UserHeader);
