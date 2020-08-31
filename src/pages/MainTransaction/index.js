import axios from "axios";
import React, { useRef, useState } from "react";
import "./styleTransaction.css";
import avatar from "../../assets/images/user.png";
import search from "../../assets/images/search.png";
import transaction from "../../assets/images/transaction.png";
import bill from "../../assets/images/bill.png";

export default function MainTraction() {
  return (
    <div className="homepage">
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
          <button className="view-today">TODAY</button>
          <button className="view-transactions">
            <img src={transaction}></img>
          </button>
          <button className="search-transactions">
            <img src={search}></img>
          </button>
          <button className="add-transaction">
            <span className="add-transaction-text">ADD TRANSACTION</span>
          </button>
        </div>
      </div>
      <div className="transactions">
        <div className="time-transactions">
          <span className="day-transactions-calendars">2020 01/06 - 30/06</span>
          <span className="last-month-transactions-calendars">LAST MONTH</span>
          <span className="this-month-transactions-calendars">THIS MONTH</span>
        </div>
        <hr className="line-1"></hr>
        <div className="inflow-and-outflow">
          <div className="inflow">
            <span className="inflow-text">Inflow</span>
            <span className="inflow-number">2,000,000 ₫</span>
          </div>
          <div className="outflow">
            <span className="outflow-text">Outflow</span>
            <span className="outflow-number">- 1,500,000 ₫</span>
          </div>
          <div className="balance">
            <hr className="line-2"></hr>
            <div className="balance-after-flow">+ 500,000 ₫</div>
          </div>
        </div>
        <hr className="rectangle"></hr>
        <div className="transactions-by-transactions">
          <div className="caterogy-transactions">
            <div className="transactions-desc">
              <img className="caterogy-transactions-biil" src={bill}></img>
              <div className="transactions-div">
                <span className="name-transactions">Bills & Utilities</span>
                <span className="count-transactions">1 Transactions</span>
              </div>
            </div>
            <span className="transactions-bill-number">1,000,000 ₫</span>
          </div>
          <hr className="line-3"></hr>
          <div className="day-transactions"></div>
        </div>
        <hr className="rectangle"></hr>
        <div className="transactions-by-category">
          <div className="caterogy-transactions">
            <div className="transactions-desc">
              <img className="caterogy-transactions-biil" src={bill}></img>
              <div className="transactions-div">
                <span className="name-transactions">Salary</span>
                <span className="count-transactions">1 Transactions</span>
              </div>
            </div>
            <span className="transactions-bill-number">500,000 ₫</span>
          </div>
          <hr className="line-3"></hr>
          <div className="day-transactions"></div>
        </div>
      </div>
    </div>
  );
}
