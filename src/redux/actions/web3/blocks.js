export const NEW_BLOCK_HEADER = 'NEW_BLOCK_HEADER';
export const newBlockHeader = blockHeader => ({
  type: NEW_BLOCK_HEADER,
  payload: blockHeader
});
