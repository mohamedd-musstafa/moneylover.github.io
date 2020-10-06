import jwtDecode from "jwt-decode";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import api from "./api";

const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const token =
    localStorage.getItem("token") &&
    localStorage.getItem("token").replace("Bearer ", "");
  if (token && jwtDecode(token).exp < Date.now() / 1000) {
    return localStorage.clear();
  }
  return next(action);
};

const store = createStore(
  rootReducer,
  applyMiddleware(checkTokenExpirationMiddleware, thunk.withExtraArgument(api))
);

export default store;
export { checkTokenExpirationMiddleware };
