import React from "react";

/* Material-ui components */
import Ballot from "@material-ui/icons/Ballot";

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    global: {
        position: "absolute",
        top: "20px",
        right: "0"
    }
});

const TransactionLoader = ({ txHash, classes }) => (
    <div id="transactionLoader" className={classes.global}>
        {txHash && (
            <a
                href={`https://ropsten.etherscan.io/tx/${txHash}`}
                key={txHash}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Ballot
                    id="iconTransactionLoader"
                    color="primary"
                    fontSize="large"
                />
            </a>
        )}
    </div>
);

export default withStyles(styles)(TransactionLoader);
