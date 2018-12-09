import React from "react";
import Web3 from "web3";

/* Material ui components */
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

const PriceDialog = ({
    open,
    closeDialog,
    modifyBlendingPriceInput,
    blendingPriceInput,
    setBlendingPrice
}) => (
    <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
    >
        <DialogTitle>Set your price</DialogTitle>
        <DialogContent>
            <FormControl fullWidth>
                <InputLabel htmlFor="blendingPriceInput">Amount</InputLabel>
                <Input
                    type="number"
                    name="blendingPriceInput"
                    id="blendingPriceInput"
                    value={blendingPriceInput}
                    onChange={e => modifyBlendingPriceInput(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">Ξ</InputAdornment>
                    }
                />
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog} color="primary">
                Cancel
            </Button>
            <Button
                onClick={() => {
                    setBlendingPrice(
                        Web3.utils.toWei(blendingPriceInput, "ether")
                    );
                    closeDialog();
                }}
                color="primary"
            >
                Set this price
            </Button>
        </DialogActions>
    </Dialog>
);
export default PriceDialog;
