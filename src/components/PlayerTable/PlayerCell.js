import React from 'react';
import Web3 from 'web3';

/* Components */
import Token from './../UI/Token/Token';

/* Containers */
import BlendDialog from '../../containers/Dialogs/BlendDialog';

/* Material ui components */
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import InvertColors from '@material-ui/icons/InvertColors';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  pseudo: {
    textTransform: 'capitalize'
  },
  playerProgress: {
    width: '50%',
  },
  blendContainer: {
    textAlign: 'center',
  },
  blendAction: {
    cursor: 'pointer',
  },
})

const PlayerCell = ({
  player,
  inProgress,
  index,
  onClick,
  classes
}) => (
  <TableRow style={{ background: index % 2 === 0 ? '#fafafa' : null}}>
    <BlendDialog
        blendingToken={player.token}
        blendingAddress={player.address}
        index={index}
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
      <div className={classes.blendContainer}>
        <InvertColors
          color='primary'
          className={classes.blendAction}
          onClick={() => onClick(index)}
        />
      </div>
        {/*<Button
            className={classes.btn}
            variant='contained'
            color='primary'
            disabled={inProgress}
            onClick={onClick}
        >
          <InvertColors/>
        </Button>*/}
    </TableCell>
  </TableRow>
)

export default withStyles(styles)(PlayerCell);
