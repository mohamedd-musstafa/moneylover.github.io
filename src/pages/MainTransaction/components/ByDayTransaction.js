import React from "react";

export default function ByDayTransaction() {
  return (
    <div className="day-transactions">
      <div className="transactions-desc">
        <span className="day-transactions-bill">10</span>
        <div className="transactions-div">
          <span className="day-transactions">Monday, August 2020</span>
          <span className="desc-transactions">Description</span>
        </div>
      </div>
      <span className="transactions-bill-number-day">1,000,000 ₫</span>
    </div>
  );
}
