import React from "react";

import Web3 from "web3";

/* Component */
import Token from "../UI/Token/Token";

/* Material ui components */
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import AddCircle from "@material-ui/icons/AddCircle";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    content: {
        width: "500px"
    },
    subContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },
    firstLine: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: "2em",
        alignItems: "flex-end"
    },
    blendingTokenSpace: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    rgbDisplayer: {
        fontSize: "0.8em",
        fontWeight: "bold",
        marginBottom: "1em",
        marginTop: "1em"
    },
    icon: {
        fontSize: "xx-large"
    },
    resulting: {
        marginTop: "1.5em",
        marginBottom: "1em"
    }
});

const DefaultBlendDialog = ({
    open,
    closeDialog,
    color,
    blendingColor,
    blendingPrice,
    launchTransaction,
    classes
}) => {
    const resultingColor = {
        r: Math.floor((Number(color.r) + Number(blendingColor.r)) / 2),
        g: Math.floor((Number(color.g) + Number(blendingColor.g)) / 2),
        b: Math.floor((Number(color.b) + Number(blendingColor.b)) / 2)
    };
    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle>
                Blend your token for{" "}
                {Web3.utils.fromWei(blendingPrice, "ether")} {/*Ξ */}{" "}
                <i className="fab fa-ethereum" />
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div className={classes.subContent}>
                    <div className={classes.firstLine}>
                        <div className={classes.blendingTokenSpace}>
                            <div className={classes.rgbDisplayer}>
                                RGB(
                                {color.r},{color.g},{color.b})
                            </div>
                            <Token
                                color={color}
                                size="50"
                                boxShadowSize="1.6"
                                borderSize="1.2"
                            />
                        </div>
                        <AddCircle className={classes.icon} />
                        <div className={classes.blendingTokenSpace}>
                            <div className={classes.rgbDisplayer}>
                                RGB(
                                {blendingColor.r},{blendingColor.g},
                                {blendingColor.b})
                            </div>
                            <Token
                                color={blendingColor}
                                size="50"
                                boxShadowSize="1.6"
                                borderSize="1.2"
                            />
                        </div>
                    </div>
                    <div className={classes.secondLine}>
                        <div className={classes.blendingTokenSpace}>
                            <ArrowDownward
                                className={`${classes.icon} ${
                                    classes.resulting
                                }`}
                            />
                            <Token
                                color={resultingColor}
                                size="70"
                                boxShadowSize="1.6"
                                borderSize="1.2"
                            />
                            <div className={classes.rgbDisplayer}>
                                RGB(
                                {resultingColor.r},{resultingColor.g},
                                {resultingColor.b})
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        launchTransaction();
                        closeDialog();
                    }}
                    color="primary"
                >
                    Blend
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(DefaultBlendDialog);
