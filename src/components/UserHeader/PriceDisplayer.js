import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    fontSize: '1.5em',
    marginTop: '1em'
  }
})

const PriceDisplayer = ({ classes, blendingPrice }) => (
  <div className={classes.global}>
    {blendingPrice} <i className="fab fa-ethereum"></i>
  </div>
)

export default withStyles(styles)(PriceDisplayer);
