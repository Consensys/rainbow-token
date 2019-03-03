// Libs
import React from "react";
import PropTypes from 'prop-types';

/* Containers */
import UserSpace from "./UserSpace";
import ConsenSysElement from "./ConsenSysElement";
import PriceSelector from "./PriceSelector";
import DefaultBlend from "./DefaultBlend";

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
   global: {
       color: "white",
       width: "100%",
       height: "100px",
       position: "sticky",
       top: 0,
       zIndex: 4,
       paddingTop: '10px',
   },
   header: {
       display: "flex",
       flexDirection: "row",
       justifyContent: "space-around",
       alignItems: "center",
       height: "78px"
   },
   hr: {
       margin: "10px",
       border: "none",
       height: "2px",
       background:
           "linear-gradient(-45deg, #ff0000 0%,#ffff00 25%,#00ff00 50%,#00ffff 75%,#0000ff 100%)"
   }
});

const Topbar = ({
  classes,
  player: {
    address,
    pseudo,
    token: {
      color,
      blendingPrice,
      defaultColor,
    },
    score,
  },
  balance,
  txInProgress,
  openPriceDialog,
  openDefaultBlendDialog,
  openRulesDialog,
}) => (
   <div className={classes.global}>
       <div className={classes.header}>
           <UserSpace
              address={address}
              pseudo={pseudo}
              balance={balance}
              currentColor={color}
              score={score}
           />
           <DefaultBlend
              onClick={openDefaultBlendDialog}
              disabled={txInProgress}
              defaultColor={defaultColor}
           />
           <PriceSelector
              onClick={openPriceDialog}
              disabled={txInProgress}
              blendingPrice={blendingPrice}
           />
           <ConsenSysElement
              onClick={openRulesDialog}
           />
       </div>
       <hr className={classes.hr} />
   </div>
);

Topbar.propTypes = {
  classes: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  balance: PropTypes.string.isRequired,
  txInProgress: PropTypes.bool.isRequired,
  openPriceDialog: PropTypes.func.isRequired,
  openDefaultBlendDialog: PropTypes.func.isRequired,
  openRulesDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(Topbar);
