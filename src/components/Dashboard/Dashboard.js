import React from "react";

/* Containers */
import RulesDialog from "../../containers/Dialogs/RulesDialog";
import DefaultBlendDialog from "../../containers/Dialogs/DefaultBlendDialog";
import PriceDialog from "../../containers/Dialogs/PriceDialog";
import VictoryDialog from "../../containers/Dialogs/VictoryDialog";
import PlayerTable from "../../containers/PlayerTable/PlayerTable";
import Topbar from "../../containers/Topbar/Topbar";
import TransactionSnackbar from "../../containers/TransactionSnackbar/TransactionSnackbar";

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    global: {
        height: "100vh",
        width: "100%",
        zIndex: 2
    },
});

const Dashboard = ({ classes }) => (
    <div className={classes.global}>
        <Topbar />
        <PlayerTable />
        <RulesDialog />
        <DefaultBlendDialog />
        <PriceDialog />
        <VictoryDialog />
        <TransactionSnackbar />
    </div>
);

export default withStyles(styles)(Dashboard);
