/* eslint-disable jsx-a11y/no-onchange */
import React, { memo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import "react-tabs/style/react-tabs.css";
// import "./TransactionStyle.css";
import { deleteTransaction } from "../../../actions/transactions";
import "./AddTransaction/TransactionStyle.css";

Modal.setAppElement("#root");

const selector = ({ transactions }) => transactions;

function Delete({ isOpen, onRequestClose, setTransactionIndex, id, styleDiv }) {
  const dispatch = useDispatch();
  const transactions = useSelector(selector);
  const onDelete = (id) => () => {
    setTransactionIndex(undefined);
    dispatch(deleteTransaction(id));
    onRequestClose();
    const transactionsStyle = document.querySelector("#transactions");
    const hiddenTransactionDetail = document.querySelector(
      "#hidden-transaction-detail"
    );
    if (styleDiv !== 0) {
      transactionsStyle.style.margin = "50px auto 0px auto";
      transactionsStyle.style.width = "55%";
      hiddenTransactionDetail.style.display = "none";
    }
  };
  return (
    <>
      <Modal
        className="custom-style3"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <div className="div-delete-wrap">
          <div className="confirmation-delete">
            <span className="confirmation-text">CONFIRMATION</span>
            <span className="confirmation-sure-text">
              Are you sure to delete this transaction ?
            </span>
          </div>
          <div className="btn-group">
            <button onClick={onRequestClose} className="btn-delete-no">
              <span className="btn-no-delete-text">NO</span>
            </button>
            <button onClick={onDelete(id)} className="btn-delete-yes">
              <span className="btn-yes-delete-text">YES</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default memo(Delete);
