const addTransactionReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_TRANSACTION":
      console.log(action.payload);
      return action.payload;
    case "ADD_TRANSACTION": {
      return [...state, action.payload].sort((a, b) => {
        const transactionDateA = new Date(a.date);
        const transactionDateB = new Date(b.date);

        return transactionDateA - transactionDateB;
      });
    }
    case "DELETE_TRANSACTION": {
      const test = state.filter(({ id }) => id !== action.payload);
      console.log(test, action.payload);

      return test;
    }
    default:
      return state;
  }
};
export default addTransactionReducer;
