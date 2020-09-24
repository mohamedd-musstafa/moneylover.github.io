import { combineReducers } from "redux";
import transactions from "./transactions";
import user from "./user";

const rootReducer = combineReducers({
  transactions,
  user,
});

export default rootReducer;
