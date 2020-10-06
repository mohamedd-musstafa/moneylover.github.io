import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import BillIcon from "../../assets/images/bill.png";
// import { deleteTransaction } from "../../actions/transactions";
import closeIcon from "../../assets/images/close-icon.png";
import FoodDrink from "../../assets/images/food-drink.png";
import GiftIcon from "../../assets/images/gift.png";
import OtherIcon from "../../assets/images/money-other.png";
import SalaryIcon from "../../assets/images/money-salary.png";
import SellIcon from "../../assets/images/sell.png";
import Transportation from "../../assets/images/transportation.png";
import Transaction from "./components/AddTransaction/Transaction";
import Delete from "./components/Delete";
import TabTransaction from "./components/TabTransaction";
import Topbar from "./components/Topbar";
import "./transaction.css";
// import Details from "./components/Details";

const selector = ({ transactions }) => transactions;

const categoryImages = {
  RESTAURANT: BillIcon,
  SHOPPING: Transportation,
  TRANSPORTATION: FoodDrink,
  OTHERS: OtherIcon,
  SALARY: SalaryIcon,
  FREELANCE: GiftIcon,
  INVESTMENT: SellIcon,
};

export default function MainTraction() {
  const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useState(false);
  const onOpenPopupConfirmModal = () => setIsPopupConfirmOpen(true);
  const onClosePopupConfirmModal = () => setIsPopupConfirmOpen(false);
  const [timeShifted, setTimeShifted] = useState(0);
  const [transactionIndex, setTransactionIndex] = useState(undefined);
  const transactions = useSelector(selector);
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);
  const [transaction, setTransaction] = useState(undefined);
  const [viewBy, setViewBy] = useState("Category");
  const [styleDiv, setStyleDiv] = useState();
  const onEdit = (tran) => () => {
    setIsEditTransactionOpen(true);
    setTransaction(tran);
  };
  const changeDivTransactionDetail = () => {
    setStyleDiv();
    setTransactionIndex(undefined);
    const hiddenTransactionDe = document.querySelector(
      "#hidden-transaction-detail"
    );
    if (hiddenTransactionDe.style.display === "none") {
      hiddenTransactionDe.style.display = "block";
    } else {
      hiddenTransactionDe.style.display = "none";
    }
    const transactionsStyle = document.querySelector("#transactions");
    if (styleDiv !== 0) {
      transactionsStyle.style.margin = "50px auto 0px auto";
      transactionsStyle.style.width = "55%";
    }
  };
  const renderTransactionDetail = (type) => {
    const trans = transactions.find(({ id }) => transactionIndex === id);
    if (trans) {
      const { id, date, amount, description, category } = trans;
      const displayDate = moment(date).format("dddd, MMMM Do YYYY");

      return (
        <div id="transaction-detail">
          <div className="top-wrap-detail">
            <Delete
              id={id}
              setTransactionIndex={setTransactionIndex}
              isOpen={isPopupConfirmOpen}
              onRequestClose={onClosePopupConfirmModal}
            />
            <div id="close-div" onClick={changeDivTransactionDetail}>
              <img alt="icon" className="img-detail" src={closeIcon} />
              <span className="text-detail">Transaction Details</span>
            </div>
            <div className="btn-group">
              <button
                className="btn-delete"
                type="button"
                onClick={onOpenPopupConfirmModal}
              >
                Delete
              </button>
              <button
                className="btn-edit"
                type="button"
                onClick={onEdit(trans)}
              >
                Edit
              </button>
            </div>
          </div>
          <hr className="line" />
          <div className="transactions-random-detail">
            <div className="icon-transactions-detail-div">
              <img
                alt="icon"
                src={categoryImages[category]}
                className="icon-transaction-detail"
              />
            </div>
            <div className="transactions-div">
              <span className="category-in-detail">{category}</span>
              <span className="day-transactions-detail">{displayDate}</span>
              <hr className="line-10" />
              <div className="description-and-amount">
                <span className="desc-transactions">{description}</span>{" "}
                {/* <span className="transactions-bill-number-day">{amount} ₫</span> */}
                {type ? (
                  <span className="transactions-bill-number-day-out">
                    {amount} ₫
                  </span>
                ) : (
                  <span className="transactions-bill-number-day-in">
                    {amount} ₫
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return undefined;
  };

  return (
    <div className="homepage">
      <Transaction
        isOpen={isEditTransactionOpen}
        onRequestClose={() => setIsEditTransactionOpen(false)}
        type="edit"
        transaction={transaction}
      />
      <Topbar setViewBy={setViewBy} setTimeShifted={setTimeShifted} />
      <div id="transactions">
        <TabTransaction
          timeShifted={timeShifted}
          setTimeShifted={setTimeShifted}
          transactionIndex={transactionIndex}
          setTransactionIndex={setTransactionIndex}
          viewBy={viewBy}
        />
      </div>
      <div id="hidden-transaction-detail">{renderTransactionDetail()}</div>
      {/* <Details /> */}
    </div>
  );
}
