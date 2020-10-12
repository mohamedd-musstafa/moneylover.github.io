const addTransactionReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIST_TRANSACTION':
      return action.payload;
    case 'SEARCH_TRANSACTION':
      return action.payload;
    case 'ADD_TRANSACTION': {
      return [...state, action.payload].sort((a, b) => {
        const transactionDateA = new Date(a.date);
        const transactionDateB = new Date(b.date);

        return transactionDateA - transactionDateB;
      });
    }
    case 'DELETE_TRANSACTION': {
      return state.filter(({ id }) => id !== action.payload);
    }
    case 'EDIT_TRANSACTION': {
      const index = state.findIndex(({ id }) => id === action.payload.id);

      if (index !== 0) {
        state[index] = action.payload;
        return [...state];
      }
      return state;
    }
    default:
      return state;
  }
};
export default addTransactionReducer;
