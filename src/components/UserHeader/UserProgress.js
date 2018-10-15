import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    width: '100%',
    fontSize: '0.6em',
    marginTop: '1em',
  },
  tokenProgress: {
    marginLeft: '1em',
    width: '60%'
  }
})

const UserProgress = ({ classes, score }) => (
  <div className={classes.global}>
    {score} %
    <progress
      className={classes.tokenProgress}
      value={score}
      max='100'
    >
        {score} %
    </progress>
  </div>
)

export default withStyles(styles)(UserProgress);
