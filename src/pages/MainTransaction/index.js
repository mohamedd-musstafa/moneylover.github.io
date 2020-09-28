import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../actions/transactions";
import closeIcon from "../../assets/images/close-icon.png";
import Transaction from "./components/AddTransaction/Transaction";
import TabTransaction from "./components/TabTransaction";
import Topbar from "./components/Topbar";
import "./transaction.css";
import Modal from "react-modal";
import Delete from "./components/Delete";
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

  const onDelete = (id) => () => {
    dispatch(deleteTransaction(id));
  };

  const renderTransactionDetail = () => {
    if (transactionIndex) {
      const { id, date, amount, description } = transactions[transactionIndex];
      const dayOfMonth = moment(date).date();
      const displayDate = moment(date).format("dddd, MMMM/Do/YYYY");

      return (
        <div id="transaction-detail">
          <div className="top-wrap-detail">
            {/* <Delete onRequestClose={onClosePopupConfirmModal} /> */}
            <div className="">
              <img alt="icon" className="img-detail" src={closeIcon}></img>
              <span className="text-detail">Transaction Details</span>
            </div>
            <div className="btn-group">
              <button
                className="btn-delete"
                type="button"
                // onClick={onOpenPopupConfirmModal}
                onClick={onDelete(id)}
              >
                Delete
              </button>
              <button
                className="btn-edit"
                type="button"
                onClick={onEdit(transactions[transactionIndex])}
              >
                Edit
              </button>
            </div>
          </div>
          <hr className="line"></hr>
          <div className="transactions-random">
            <div className="transactions-desc">
              <span className="day-transactions-bill">{dayOfMonth}</span>
              <div className="transactions-div">
                <span className="day-transactions">{displayDate}</span>
                <span className="desc-transactions">
                  Description: {description}
                </span>
              </div>
            </div>
            <span className="transactions-bill-number-day">{amount} ₫</span>
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
    </div>
  );
}
