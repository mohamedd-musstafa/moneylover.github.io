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
      const transactionDelete = state.filter(({ id }) => id !== action.payload);
      console.log(transactionDelete, action.payload);

      return transactionDelete;
    }
    // case "EDIT_TRANSACTION": {
    //   console.log("hahaha");
    // }
    default:
      return state;
  }
};
export default addTransactionReducer;
