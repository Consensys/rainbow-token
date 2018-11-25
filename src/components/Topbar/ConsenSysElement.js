import React from 'react';

/* Components */
import ConsenSysToken from './../UI/Token/Token';

/* Constants */
import { targetColor } from '../../constants/rainbowToken';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    textShadow: '0px 0px 4px rgb(10, 10, 10)',
  },
  text: {
    fontSize: '1.1em',
    marginRight: '1em',
    marginLeft: '1em',
  }
})

const ConsenSysElement = ({
  classes,
  onClick
}) => (
  <div className={classes.global}>
    <ConsenSysToken
      color={targetColor}
      size='50'
      boxShadowSize='1.6'
      borderSize='1.2'
    />
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
