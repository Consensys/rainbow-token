import React from 'react';

/* Components */
import UserHeader from './UserHeader';
import PlayerTable from './PlayerTable';
import Snackbar from '@material-ui/core/Snackbar';

const HomepagePlayer = ({
    players,
    currentPlayer,
    inProgress,
    blend,
    setBlendingPrice,
}) => (
    <div>
        <UserHeader
            currentPlayer={currentPlayer}
            inProgress={inProgress}
            blend={blend}
            setBlendingPrice={setBlendingPrice}
        />
        <hr className='rainbow2' />
        <PlayerTable
            currentPlayer={currentPlayer}
            players={players}
            inProgress={inProgress}
            blend={blend}
        />
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={inProgress}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<div id="message-id" style={{ textAlign: 'center' }}><div>Your transaction is pending...</div><div>Please, wait until your transaction has been included in a mined block.</div></div>}
        />
    </div>
);

export default HomepagePlayer;
