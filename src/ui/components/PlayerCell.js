import React, { Component } from 'react';
import Web3 from 'web3';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import BlendingDialog from './BlendingDialog';
import Token from './Token';

/* Styles */
import { withStyles } from "@material-ui/core/styles";
import { playerCellStyle } from '../styles'

class PlayerCell extends Component {
    constructor (props) {
        super(props);
        this.state = {
            blendDialogOpen: false,
        };
    }

  handleClickBlendOpen = () => {
      this.setState({ blendDialogOpen: true });
  };

  handleBlendClose = () => {
      this.setState({ blendDialogOpen: false });
  };

  render () {
      const {
          currentPlayer,
          player,
          inProgress,
          blend,
          index,
          classes
      } = this.props;
      const { blendDialogOpen } = this.state;
      const style = index % 2 === 0 ? ({
          backgroundColor: '#fafafa'
      }) : ({});
      return (
          <TableRow key={player.pseudo} style={style}>
            <BlendingDialog
                blendDialogOpen={blendDialogOpen}
                handleClose={this.handleBlendClose}
                blend={blend}
                color={currentPlayer.token.color}
                blendingColor={player.token.color}
                withSelf={false}
                blendingPrice={player.token.blendingPrice}
                blendingAddress={player.address}
            />
            <TableCell className={classes.pseudo}>
                {player.pseudo}
            </TableCell>
            <TableCell>
              <Token
                color={player.token.color}
                size='28'
                boxShadowSize='.5'
                borderSize='.5'
              />
            </TableCell>
            <TableCell>
                {Web3.utils.fromWei(player.token.blendingPrice, 'ether')}
            </TableCell>
            <TableCell>
              <span>
                {player.score} %
                <progress
                  className={classes.playerProgress}
                  value={player.score} max='100'
                >
                  {player.score} %
                </progress>
              </span>
            </TableCell>
            <TableCell>
                <Button
                    variant='contained'
                    color='primary'
                    disabled={inProgress !== undefined}
                    onClick={this.handleClickBlendOpen}
                >
                  Blend
                </Button>
            </TableCell>
          </TableRow>
      );
  }
}

export default withStyles(playerCellStyle)(PlayerCell);
