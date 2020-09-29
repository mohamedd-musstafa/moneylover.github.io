import moment from "moment";
import React, { memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { default as BillIcon } from "../../../assets/images/bill.png";
import FoodDrink from "../../../assets/images/food-drink.png";
import GiftIcon from "../../../assets/images/gift.png";
import OtherIcon from "../../../assets/images/money-other.png";
import SalaryIcon from "../../../assets/images/money-salary.png";
import SellIcon from "../../../assets/images/sell.png";
import Transportation from "../../../assets/images/transportation.png";
import NoTransaction from "./NoTransaction";

const categoryImages = {
  RESTAURANT: BillIcon,
  SHOPPING: Transportation,
  TRANSPORTATION: FoodDrink,
  OTHERS: OtherIcon,
  SALARY: SalaryIcon,
  FREELANCE: GiftIcon,
  INVESTMENT: SellIcon,
};

function ListTransaction({ transactions, setTransactionIndex }) {
  const inflow = transactions.filter(
    ({ type }) => type.toUpperCase() === "INCOME"
  );
  const outflow = transactions.filter(
    ({ type }) => type.toUpperCase() === "EXPENSE"
  );
  const totalInflow = inflow.reduce((total, { amount }) => total + amount, 0);
  const totalOutflow = outflow.reduce((total, { amount }) => total + amount, 0);
  const [styleDiv, setStyleDiv] = useState();
  const onViewDetail = (index) => () => {
    setTransactionIndex(index);
    setStyleDiv();
    const x = document.getElementById("hidden-transaction-detail");
    if (x.style.display === "none") {
      x.style.display = "block";
    }
    const y = document.getElementById("transactions");
    if (styleDiv !== 0) {
      y.style.marginLeft = "72px";
      y.style.width = "660px";
    }
  };
  const renderTransactionsByCategory = (transactionsByType) => {
    const categories = transactionsByType.reduce((group, transaction) => {
      const { category } = transaction;
      if (group[category]) {
        group[category].push(transaction);
      } else {
        group[category] = [];
        group[category].push(transaction);
      }
      return group;
    }, {});
    return Object.keys(categories).map((category) => {
      const totalByCategory = categories[category].reduce(
        (total, { amount }) => total + amount,
        0
      );
      return (
        <div className="transactions-by-transactions" key={uuidv4()}>
          <div className="category-transactions">
            <div className="transactions-desc">
              <img
                alt="Bill Icon"
                className="category-transactions-bill"
                src={categoryImages[category]}
              />
              <div>
                <span className="name-transactions">{category}</span>
                <span className="count-transactions">
                  {categories[category].length} Transaction(s)
                </span>
              </div>
            </div>
            <span className="transactions-bill-number">
              {totalByCategory} ₫
            </span>
          </div>
          <hr className="line-3" />
          <div className="day-transactions">
            {categories[category].map(({ id, date, amount, description }) => {
              const dayOfMonth = moment(date).date();
              const displayDate = moment(date).format("dddd, MMMM Do YYYY");
              return (
                <div
                  className="transactions-random"
                  key={id}
                  onClick={onViewDetail(id)}
                >
                  <div className="transactions-desc">
                    <span className="day-transactions-bill">{dayOfMonth}</span>
                    <div className="transactions-div">
                      <span className="day-transactions-list">
                        {displayDate}
                      </span>
                      <span className="desc-transactions">
                        Description: {description}
                      </span>
                    </div>
                  </div>
                  <span className="transactions-bill-number-day">
                    {amount} ₫
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };
  const renderTransactions = () => {
    if (transactions.length === 0) {
      return <NoTransaction />;
    }
    return (
      <div>
        <div className="inflow-and-outflow">
          <div className="inflow">
            <span className="inflow-text">Inflow</span>
            <span className="inflow-number">{totalInflow}</span>
          </div>
          <div className="outflow">
            <span className="outflow-text">Outflow</span>
            <span className="outflow-number">-{totalOutflow}</span>
          </div>
          <div className="balance">
            <hr className="line-2" />
            <div className="balance-after-flow">
              {totalInflow - totalOutflow}
            </div>
          </div>
        </div>
        <hr className="rectangle" />
        {renderTransactionsByCategory(inflow)}
        {renderTransactionsByCategory(outflow)}
      </div>
    );
  };
  return <div>{renderTransactions()}</div>;
}
export default memo(ListTransaction);
