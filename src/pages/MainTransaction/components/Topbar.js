import React from "react";
import search from "../../../assets/images/search.png";
import transaction from "../../../assets/images/transaction.png";
import avatar from "../../../assets/images/user.png";

export default function Topbar() {
  return (
    <div className="header-bar">
      <div className="user">
        <div className="user-avatar">
          <img src={avatar}></img>
        </div>
        <div className="user-details">
          <p className="user-name">User’s Full Name</p>
          <p className="user-balance">- 8.100.000 ₫</p>
        </div>
      </div>
      <div className="user-transactions-behavior">
        <button className="view-today tooltip">
          <span className="tooltiptext">Jump to today</span>
          TODAY
        </button>
        <button className="view-transactions tooltip">
          <img src={transaction}></img>
          <span className="tooltiptext">View by category</span>
        </button>
        <button className="search-transactions tooltip">
          <img src={search}></img>
          <span className="tooltiptext">Search for transaction</span>
        </button>
        <button className="add-transaction">
          <span className="add-transaction-text">ADD TRANSACTION</span>
        </button>
      </div>
    </div>
  );
}
