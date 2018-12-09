import React, { Component } from "react";

/* Redux */
import { connect } from "react-redux";
import {
    subscribeToAccount,
    unsubscribeToAccount
} from "../../redux/actions/setUp/web3";

/* Component */
import UserSpace from "../../components/Topbar/UserSpace";

class container extends Component {
    componentDidMount() {
        const { subscribeToAccount } = this.props;
        subscribeToAccount();
    }

    componentWillUnmount() {
        const { unsubscribeToAccount } = this.props;
        unsubscribeToAccount();
    }

    render() {
        const { address, pseudo, balance, currentColor, score } = this.props;
        return (
            <UserSpace
                address={address}
                pseudo={pseudo}
                balance={balance}
                currentColor={currentColor}
                score={score}
            />
        );
    }
}

const mapStateToProps = state => ({
    address: state.web3.account.address,
    pseudo: state.data.players[state.web3.account.address].pseudo,
    balance: state.web3.account.balance,
    currentColor: state.data.players[state.web3.account.address].token.color,
    score: state.data.players[state.web3.account.address].score
});

const mapDispatchToProps = {
    subscribeToAccount,
    unsubscribeToAccount
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(container);
