// Libs
import React from "react";
import PropTypes from 'prop-types';

import Consensys_storm from "../../../static/svg/ConsenSys_storm.svg";

const LoaderItem = ({ inProgress }) => {
    const classStr = inProgress ? "loader animated-loader" : "loader";
    return (
        <div className={classStr}>
            <img alt="logo" src={Consensys_storm} />
        </div>
    );
};

LoaderItem.propTypes = {
  inProgress: PropTypes.bool.isRequired,
}

export default LoaderItem;
