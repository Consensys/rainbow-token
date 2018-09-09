import React from 'react';
import Web3 from 'web3';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const PriceDialog = ({
    priceDialogOpen,
    handleClose,
    handleChange,
    blendingPriceInput,
    setBlendingPrice,
}) => {
    return (
        <Dialog
            open={priceDialogOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle>
        Set your price
            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel htmlFor="blendingPriceInput">Amount</InputLabel>
                    <Input
                        type='number'
                        name='blendingPriceInput'
                        id="blendingPriceInput"
                        value={blendingPriceInput}
                        onChange={e => handleChange(e)}
                        startAdornment={<InputAdornment position="start">Ξ</InputAdornment>}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
          Cancel
                </Button>
                <Button onClick={e => { e.preventDefault(); setBlendingPrice(Web3.utils.toWei(blendingPriceInput)); handleClose(); }} color="primary">
          Set this price
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PriceDialog;
