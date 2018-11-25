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
    fontSize: '1.2em',
    marginBottom: '.4em'
  },
  actionRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceDisplayer: {
    fontSize: '1.5em',
  },
  btn: {
    marginRight: '2em',
    // height: '30px',
    // marginTop: '.8em',
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
    <div className={classes.actionRow}>
      <Button
        className={classes.btn}
        variant='contained'
        color='primary'
        onClick={onClick}
        disabled={disabled}
      >
        Set
      </Button>
      <div className={classes.priceDisplayer}>
        {blendingPrice} <i className="fab fa-ethereum"></i>
      </div>
    </div>
  </div>
)

export default withStyles(styles)(PriceSelector);
