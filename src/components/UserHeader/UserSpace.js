import React from 'react';

/* Components */
import UserToken from '../UI/Token/Token';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginBottom: '.4em',
    fontSize: '1.2em'
  },
  progressBar: {
    width: '100%',
    fontSize: '0.6em',
    marginTop: '.9em',
  },
  tokenProgress: {
    marginLeft: '1em',
    width: '60%'
  }
})

const UserSpace = ({
  currentColor,
  score,
  classes
}) => (
  <div className={classes.global}>
    <div className={classes.title}>
      Your Token
    </div>
    <UserToken
      color={currentColor}
      size='60'
      boxShadowSize='2'
      borderSize='1.2'
    />
    <div className={classes.progressBar}>
      {score} %
      <progress
        className={classes.tokenProgress}
        value={score}
        max='100'
      >
          {score} %
      </progress>
    </div>
  </div>
)

export default withStyles(styles)(UserSpace);
