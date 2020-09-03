import React from "react";
import bill from "../../../assets/images/bill.png";

export default function ByCategoryTransaction() {
  return (
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
  );
}
