import React from 'react';

/* Containers */
import DefaultBlendSpace from './DefaultBlendSpace';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    marginTop: '1em',
    marginBottom: '1em',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

const BottomHeader = () => (
  <div>
    <DefaultBlendSpace />
  </div>
)

export default withStyles(styles)(BottomHeader);
