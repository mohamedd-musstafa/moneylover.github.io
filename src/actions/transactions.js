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
      ({ type, category, amount, description, date }) => ({
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

export { listTransaction, addTransaction };
