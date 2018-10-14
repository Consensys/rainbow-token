import React from 'react';

import Web3 from 'web3';

/* Styles */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const DefaultBlendDialog = ({
    open,
    closeDialog,
    color,
    blendingColor,
    blendingPrice,
}) => {
    const resultingColor = {
        r: Math.floor((Number(color.r) + Number(blendingColor.r)) / 2),
        g: Math.floor((Number(color.g) + Number(blendingColor.g)) / 2),
        b: Math.floor((Number(color.b) + Number(blendingColor.b)) / 2),
    };
    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle>
              Blend your token for {Web3.utils.fromWei(blendingPrice, 'ether')} Ξ
            </DialogTitle>
            <DialogContent style={{ width: '500px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2em' }}>
                        <div style={{ display: 'flex' }}>
                            <span>RGB({color.r}, {color.g}, {color.b})</span>
                            <span style={{ display: 'inline-block', marginLeft: '1em', width: '15px', height: '15px', background: `rgb(${color.r}, ${color.g}, ${color.b})`, borderRadius: '50%' }}></span>
                        </div>
                        <div>
              blended with
                        </div>
                        <div>
                            <span style={{ display: 'inline-block', marginRight: '1em', width: '15px', height: '15px', background: `rgb(${blendingColor.r}, ${blendingColor.g}, ${blendingColor.b})`, borderRadius: '50%' }}></span>
                            <span>RGB({blendingColor.r}, {blendingColor.g}, {blendingColor.b})</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
            giving <span style={{ display: 'inline-block', marginRight: '1em', marginLeft: '1em', width: '15px', height: '15px', background: `rgb(${resultingColor.r}, ${resultingColor.g}, ${resultingColor.b})`, borderRadius: '50%' }}></span> RGB({resultingColor.r}, {resultingColor.g}, {resultingColor.b})
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={closeDialog}
                color="primary"
              >
                Blend
              </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DefaultBlendDialog;
