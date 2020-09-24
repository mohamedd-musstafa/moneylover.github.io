import React from "react";
import notransaction from "../../../assets/images/no-transaction.png";

export default function NoTransaction() {
  return (
    <div className="notransaction-display">
      <img
        alt="No Transaction Icon"
        className="notransaction"
        src={notransaction}
      ></img>
      <span className="notransaction-text">No Transactions</span>
    </div>
  );
}
