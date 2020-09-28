import axios from "axios";
import moment from "moment";

const listTransaction = () => async (dispatch, _getState, api) => {
  try {
    const requestSource = axios.CancelToken.source();

    const res = await api(requestSource).get("/transactions/v1.0", {
      params: {
        dateFrom: moment().subtract(1, "year").toISOString(),
        dateTo: moment().add(1, "year").toISOString(),
      },
    });

    const data = res.data.map(
      ({ id, type, category, amount, description, date }) => ({
        id,
        type,
        category,
        amount,
        description,
        date,
      })
    );

    dispatch({
      type: "LIST_TRANSACTION",
      payload: data,
    });

    return requestSource;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const addTransaction = (type, category, amount, description, date) => async (
  dispatch,
  _getState,
  api
) => {
  console.log(
    "addTransaction -> type, category, amount, description, date",
    type,
    category,
    amount,
    description,
    date
  );
  try {
    const requestSource = axios.CancelToken.source();

    await api(requestSource).post("/transactions/v1.0", {
      type,
      category,
      amount,
      description,
      date,
    });

    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        type,
        category,
        amount,
        description,
        date,
      },
    });

    return requestSource;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const editTransaction = (
  id,
  type,
  category,
  amount,
  description,
  date
) => async (dispatch, _getState, api) => {
  try {
    console.log(id, type, category, amount, description, date);
    const requestSource = axios.CancelToken.source();

    await api(requestSource).put(`/transactions/v1.0/${id}`, {
      type,
      category,
      amount,
      description,
      date,
    });

    dispatch({
      type: "EDIT_TRANSACTION",
      payload: {
        type,
        category,
        amount,
        description,
        date,
      },
    });

    return requestSource;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const deleteTransaction = (id) => async (dispatch, _getState, api) => {
  try {
    const requestSource = axios.CancelToken.source();

    const test = await api(requestSource).delete(`/transactions/v1.0/${id}`);

    console.log(test);

    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });

    return requestSource;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export { listTransaction, addTransaction, editTransaction, deleteTransaction };
