import React from "react";
import ByCategoryTransaction from "../components/ByCategoryTransaction";
import ByDayTransaction from "../components/ByDayTransaction";

export default function ListTransaction() {
  return (
    <div>
      {" "}
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
        <ByCategoryTransaction />
        <hr className="line-3"></hr>
        <ByDayTransaction />
      </div>
      <hr className="rectangle"></hr>
      <div className="transactions-by-category">
        <ByCategoryTransaction />
        <hr className="line-3"></hr>
        <ByDayTransaction />
      </div>
    </div>
  );
}
