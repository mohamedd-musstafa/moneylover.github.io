import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import search from "../../../assets/images/search.png";
import transaction from "../../../assets/images/transaction.png";
import category from "../../../assets/images/category.png";
import avatar from "../../../assets/images/user.png";
import Transaction from "./AddTransaction/Transaction";
import { searchTransaction } from "../../../actions/transactions";

export default function Topbar({ setTimeShifted, setViewBy, setIsSearch }) {
  const dispatch = useDispatch();
  const balance = localStorage.getItem("balance");
  const firstName = localStorage.getItem("firstName");
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  const [buttonClickBehavior, setButtonClickBehavior] = useState(false);
  const onChangeButtonViewBy = () => {
    setButtonClickBehavior(buttonClickBehavior !== true);
  };
  const onOpenAddNewTransactionModal = () => setIsNewTransactionOpen(true);
  const onCloseAddNewTransactionModal = () => setIsNewTransactionOpen(false);
  const onJumpToday = () => {
    setTimeShifted(0);
  };

  const [pattern, setPattern] = useState("");

  useEffect(() => {
    if (pattern === "") {
      setIsSearch(false);
    }
  }, [pattern]);

  const onPatternChange = (e) => {
    const { value } = e.target;
    setPattern(value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    setIsSearch(true);
    dispatch(searchTransaction(pattern));
  };

  return (
    <div className="header-bar">
      <Transaction
        isOpen={isNewTransactionOpen}
        onRequestClose={onCloseAddNewTransactionModal}
        type="add"
      />
      <div className="user">
        <div className="user-avatar">
          <img alt="User's Avatar" src={avatar} />
        </div>
        <div className="user-details">
          <p className="user-name"> {firstName} </p>
          <p className="user-balance">{balance}</p>
        </div>
      </div>
      <div className="user-transactions-behavior">
        <button
          onClick={onJumpToday}
          type="button"
          className="view-today tooltip"
        >
          <span className="tooltiptext">Jump to today</span>
          TODAY
        </button>
        <div onClick={onChangeButtonViewBy} className="button-change-view">
          {buttonClickBehavior ? (
            <button
              onClick={() => setViewBy("Category")}
              type="button"
              className="view-transactions-by-category tooltip"
            >
              <img alt="View Transaction" src={category} />
              <span className="tooltiptext">View by category</span>
            </button>
          ) : (
            <button
              type="button"
              className="view-transactions-by-transaction tooltip"
              onClick={() => setViewBy("Date")}
            >
              <img alt="View Transaction" src={transaction} />
              <span className="tooltiptext">View by transaction</span>
            </button>
          )}
        </div>
        <div className="search-box">
          <form className="input-search-form" onSubmit={onSearch}>
            <input
              type="text"
              placeholder="Search.."
              value={pattern}
              onChange={onPatternChange}
            />
            <button type="submit" className="search-transactions tooltip">
              <img alt="Search Transaction" src={search} />
              <span className="tooltiptext">Search for transaction</span>
            </button>
          </form>
        </div>
        <button
          type="button"
          onClick={onOpenAddNewTransactionModal}
          className="add-transaction"
        >
          <span className="add-transaction-text">Add Transaction</span>
        </button>
      </div>
    </div>
  );
}
