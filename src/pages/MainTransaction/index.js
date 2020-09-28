import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteTransaction } from "../../actions/transactions";
import closeIcon from "../../assets/images/close-icon.png";
import Transaction from "./components/AddTransaction/Transaction";
import Delete from "./components/Delete";
import TabTransaction from "./components/TabTransaction";
import Topbar from "./components/Topbar";
import "./transaction.css";
// import Details from "./components/Details";

const selector = ({ transactions }) => transactions;

export default function MainTraction() {
  const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useState(false);
  const onOpenPopupConfirmModal = () => setIsPopupConfirmOpen(true);
  const onClosePopupConfirmModal = () => setIsPopupConfirmOpen(false);
  const [timeShifted, setTimeShifted] = useState(0);
  const [transactionIndex, setTransactionIndex] = useState(undefined);
  const transactions = useSelector(selector);
  const dispatch = useDispatch();
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);
  const [transaction, setTransaction] = useState(undefined);
  const onEdit = (tran) => () => {
    setIsEditTransactionOpen(true);
    setTransaction(tran);
  };
  const renderTransactionDetail = () => {
    const trans = transactions.find(({ id }) => transactionIndex === id);
    if (trans) {
      const { id, date, amount, description, category } = trans;
      const dayOfMonth = moment(date).date();
      const displayDate = moment(date).format("dddd, MMMM Do YYYY");

      return (
        <div id="transaction-detail">
          <div className="top-wrap-detail">
            <Delete
              id={id}
              isOpen={isPopupConfirmOpen}
              onRequestClose={onClosePopupConfirmModal}
            />
            <div id="close-div">
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
            <div className="transactions-div">
              <span className="category-in-detail">{category}</span>
              <span className="day-transactions">{displayDate}</span>
              <hr className="line-10"></hr>
              <div className="description-and-amount">
                <span className="desc-transactions">{description}</span>{" "}
                <span className="transactions-bill-number-day">{amount} ₫</span>
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
      <Topbar setTimeShifted={setTimeShifted} />
      <div className="transactions">
        <TabTransaction
          timeShifted={timeShifted}
          setTimeShifted={setTimeShifted}
          setTransactionIndex={setTransactionIndex}
        />
      </div>
      <div>{renderTransactionDetail()}</div>
      {/* <Details /> */}
    </div>
  );
}
