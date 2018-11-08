import React from 'react';

import Consensys_storm from '../../../static/svg/ConsenSys_storm.svg';

const LoaderItem = ({ txInProgress }) => {
  const classStr = txInProgress ? 'loader animated-loader' : 'loader';
  return (
    <div className={classStr}><img alt='logo' src={Consensys_storm} /></div>
  );
};

export default LoaderItem;
