export const OPEN_RULES_DIALOG = 'OPEN_RULES_DIALOG';
export const openRulesDialog = () => ({
  type: OPEN_RULES_DIALOG
});

export const CLOSE_RULES_DIALOG = 'CLOSE_RULES_DIALOG';
export const closeRulesDialog = () => ({
  type: CLOSE_RULES_DIALOG
})

export const OPEN_DEFAULT_BLEND_DIALOG = 'OPEN_DEFAULT_BLEND_DIALOG';
export const openDefaultBlendDialog = () => ({
  type: OPEN_DEFAULT_BLEND_DIALOG
})

export const CLOSE_DEFAULT_BLEND_DIALOG = 'CLOSE_DEFAULT_BLEND_DIALOG';
export const closeDefaultBlendDialog = () => ({
  type: CLOSE_DEFAULT_BLEND_DIALOG
});

export const OPEN_PRICE_DIALOG = 'OPEN_PRICE_DIALOG';
export const openPriceDialog = () => ({
  type: OPEN_PRICE_DIALOG
})

export const CLOSE_PRICE_DIALOG = 'CLOSE_PRICE_DIALOG';
export const closePriceDialog = () => ({
  type: CLOSE_PRICE_DIALOG
});

export const MODIFY_BLENDING_PRICE_INPUT = 'MODIFY_BLENDING_PRICE_INPUT';
export const modifyBlendingPriceInput = payload => ({
  type: MODIFY_BLENDING_PRICE_INPUT,
  payload
})
