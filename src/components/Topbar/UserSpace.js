import React from 'react';

/* Components */
import UserToken from './MyToken';

/* Identicon */
import Blockies from 'react-blockies';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'row',
    textShadow: '0px 0px 4px rgb(10, 10, 10)',
  },
  informations: {
    fontSize: '1.1em',
    marginRight: '1em',
  },
  pseudo: {
    textTransform: 'capitalize',
    fontSize: '1.2em'
  },
  address: {
   marginTop: '0.4em'
 },
  balanceAndIcon: {
   marginTop: '0.4em',
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-around'
 },
 blockies: {
   borderRadius: '5px'
 },
})

const UserSpace = ({
  address,
  pseudo,
  balance,
  currentColor,
  score,
  classes
}) => (
  <div className={classes.global}>
    <div className={classes.informations}>
      <div className={classes.pseudoLine}>
        Welcome <strong className={classes.pseudo}>{pseudo}</strong>
      </div>
      <div className={classes.balanceAndIcon}>
        <Blockies className={classes.blockies} seed={address} />
        <div>{balance} <i className="fab fa-ethereum"></i></div>
      </div>
    </div>
    <UserToken
      score={score}
      color={currentColor}
      size='50'
      boxShadowSize='1'
      borderSize='0.6'
      radius='26.5'
      strokeWidth='3'
    />
  </div>
)

export default withStyles(styles)(UserSpace);
