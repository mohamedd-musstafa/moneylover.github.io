import React, { useState } from "react";
import search from "../../../assets/images/search.png";
import transaction from "../../../assets/images/transaction.png";
import avatar from "../../../assets/images/user.png";
import Transaction from "./AddTransaction/Transaction";

export default function Topbar({ setTimeShifted }) {
  // const balance = localStorage.getItem("balance");
  const firstName = localStorage.getItem("firstName");
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  const onOpenAddNewTransactionModal = () => setIsNewTransactionOpen(true);
  const onCloseAddNewTransactionModal = () => setIsNewTransactionOpen(false);
  const onJumpToday = () => {
    setTimeShifted(0);
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
          <p className="user-balance">{/* {balance} */}</p>
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
        <button type="button" className="view-transactions tooltip">
          <img alt="View Transaction" src={transaction} />
          <span className="tooltiptext">View by category</span>
        </button>
        <button type="button" className="search-transactions tooltip">
          <img alt="Search Transaction" src={search} />
          <span className="tooltiptext">Search for transaction</span>
        </button>
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
