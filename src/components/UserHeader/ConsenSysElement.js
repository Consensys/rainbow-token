import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    fontSize: '1.3em',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    marginRight: '1em'
  }
})

const ConsenSysElement = ({
  classes,
  onClick
}) => (
  <div className={classes.global}>
    <div className={classes.text}>
      Reach the blue<br/> <strong>Consensys</strong> Token
    </div>
    <div id='helpIcon' onClick={onClick}>
      <i className="fas fa-question-circle">
      </i>
    </div>
  </div>
)

export default withStyles(styles)(ConsenSysElement);
