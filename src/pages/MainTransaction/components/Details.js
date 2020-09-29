/* eslint-disable jsx-a11y/no-onchange */
import moment from "moment";
import React, { memo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import "react-tabs/style/react-tabs.css";
import closeIcon from "../../../assets/images/close-icon.png";
// import "./TransactionStyle.css";
// import { deleteTransaction } from "../../../actions/transactions";
import "./AddTransaction/TransactionStyle.css";

Modal.setAppElement("#root");

const selector = ({ transactions }) => transactions;

function Details({ isOpen, onRequestClose, id }) {
  const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useState(false);
  const onOpenPopupConfirmModal = () => setIsPopupConfirmOpen(true);
  const onClosePopupConfirmModal = () => setIsPopupConfirmOpen(false);
  // const [timeShifted, setTimeShifted] = useState(0);
  const [transactionIndex, setTransactionIndex] = useState(undefined);
  const transactions = useSelector(selector);
  const dispatch = useDispatch();
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);
  const [transaction, setTransaction] = useState(undefined);
  const onEdit = (tran) => () => {
    setIsEditTransactionOpen(true);
    setTransaction(tran);
  };

  const trans = transactions.find(({ id }) => transactionIndex === id);
  if (trans) {
    const { id, date, amount, description } = trans;
    const dayOfMonth = moment(date).date();
    const displayDate = moment(date).format("dddd, MMMM/Do/YYYY");

    return (
      <Modal
        className="custom-style3"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <div id="transaction-detail">
          <div className="top-wrap-detail">
            {/* <Delete
            id={id}
            isOpen={isPopupConfirmOpen}
            onRequestClose={onClosePopupConfirmModal}
          /> */}
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
          <div className="transactions-random">
            <div className="transactions-desc">
              {/* <span className="day-transactions-bill">{dayOfMonth}</span> */}
              <div className="transactions-div">
                <span className="day-transactions">{displayDate}</span>
                <hr className="line-10"></hr>
                <span className="desc-transactions">
                  Description: {description}
                </span>
              </div>
            </div>
            <span className="transactions-bill-number-day">{amount} ₫</span>
          </div>
        </div>
      </Modal>
    );
  }

  return undefined;
}

export default memo(Details);
