import {
  NEW_BLOCK_HEADER
} from '../../actions/web3/blocks';

const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case NEW_BLOCK_HEADER:
      const updatedList = [
        {
          ...payload
        },
        ...state
      ];
      if (state.length === 3) {
        updatedList.pop();
      }
      return updatedList;
    default:
      return state;
  }
}
