// import React from 'react';
// ;

// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';
// import Button from '@material-ui/core/Button';

// const PlayerCell = ({
//   player,
//   inProgress,
//   blend
// }) => (
//   <TableRow key={player.pseudo}>
//     <TableCell>
//       {player.pseudo}
//     </TableCell>
//     <TableCell style={{}}>
//       <div style={{ display: 'flex', flexDirection:'row'}}>
//         <span>RGB({player.token.color.r}, {player.token.color.g}, {player.token.color.b})</span>
//         <span style={{ display:'inline-block', marginLeft: '1em', width: '15px', background: `rgb(${player.token.color.r}, ${player.token.color.g}, ${player.token.color.b})`, borderRadius:'50%' }}></span>
//       </div>
//     </TableCell>
//     <TableCell>
//       { player.score }
//     </TableCell>
//     <TableCell>
//       <Button
//         variant='contained'
//         color='primary'
//         disabled={inProgress}
//         onClick={e => {e.preventDefault(); blend(player.address, player.token);}}
//       >
//         { Web3.utils.fromWei(player.token.blendingPrice, 'ether') } ETH
//       </Button>
//     </TableCell>
//   </TableRow>
// )

// export default PlayerCell;

import React, { Component } from 'react';
import Web3 from 'web3';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import BlendingDialog from './BlendingDialog';

import rainbowToken from '../../static/svg/CircleTokenRainbow.svg';

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
      } = this.props;
      const { blendDialogOpen } = this.state;
      const style = index % 2 === 0 ? ({
          backgroundColor: '#fafafa',
          border: 'none',
      }) : ({ border: 'none' });
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
              <TableCell style={{ textTransform: 'capitalize' }}>
                  {player.pseudo}
              </TableCell>
              <TableCell>
                  <Tooltip disableFocusListener disableTouchListener title={`RGB(${player.token.color.r}, ${player.token.color.g}, ${player.token.color.b})`} placement="right">
                      <div className='token' style={{ backgroundImage: `url(${rainbowToken})`, marginLeft: '1em', width: '28px', height: '28px', backgroundColor: `rgb(${player.token.color.r}, ${player.token.color.g}, ${player.token.color.b})`, borderRadius: '50%', boxShadow: '.5px .5px rgba(10, 10, 10, 0.9)', border: '.5px solid rgb(50, 50, 50)' }}></div>
                  </Tooltip>
              </TableCell>
              <TableCell>
                  {Web3.utils.fromWei(player.token.blendingPrice, 'ether')}
              </TableCell>
              <TableCell>
                  <span>{player.score} %<progress style={{ width: '50%', marginLeft: '1em' }} value={player.score} max='100'>{player.score} %</progress></span>
              </TableCell>
              <TableCell>
                  <Button
                      variant='contained'
                      color='primary'
                      disabled={inProgress}
                      onClick={this.handleClickBlendOpen}
                  >
            Blend
                  </Button>
              </TableCell>
          </TableRow>
      );
  }
}

export default PlayerCell;
