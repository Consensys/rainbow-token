import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

/* Material ui components */
import Button from '@material-ui/core/Button';

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: '1em'
  },
  priceDisplayer: {
    fontSize: '1.5em',
    marginTop: '.4em'
  },
  btn: {
    // height: '30px',
    marginTop: '.8em',
    fontSize: '0.7em'
  }
})

const PriceSelector = ({
  blendingPrice,
  disabled,
  onClick,
  classes
}) => (
  <div className={classes.global}>
    <div className={classes.title}>
      Your blending price
    </div>
    <div className={classes.priceDisplayer}>
      {blendingPrice} <i className="fab fa-ethereum"></i>
    </div>
    <Button
      className={classes.btn}
      variant='contained'
      color='primary'
      onClick={onClick}
      disabled={disabled}
    >
      Set blending price
    </Button>
  </div>
)

export default withStyles(styles)(PriceSelector);
