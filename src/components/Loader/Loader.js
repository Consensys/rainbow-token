import React from 'react';

import Consensys_storm from '../../static/svg/ConsenSys_storm.svg';

const Loader = ({ inProgress }) => {
    const loader = inProgress ? (
        <div className='loader animated-loader'><img alt='logo' src={Consensys_storm} /></div>
    ) : (
        <div className='loader'><img alt='logo' src={Consensys_storm} /></div>
    );
    return loader;
};

export default Loader;
