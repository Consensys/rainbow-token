import { connect } from 'react-redux';

import LoaderItem from '../../components/UI/LoaderItem/LoaderItem';

const mapStateToProps = state => ({
  txInProgress: !!state.web3.transactions.txHash
})

export default connect(mapStateToProps, null)(LoaderItem);
