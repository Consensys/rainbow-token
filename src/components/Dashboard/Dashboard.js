import React from "react";

/* Containers */
import RulesDialog from "../../containers/Dialogs/RulesDialog";
import DefaultBlendDialog from "../../containers/Dialogs/DefaultBlendDialog";
import PriceDialog from "../../containers/Dialogs/PriceDialog";
import PlayerTable from "../../containers/Dashboard/PlayerTable";
import Topbar from "../../containers/Dashboard/Topbar";

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
    </div>
);

export default withStyles(styles)(Dashboard);
