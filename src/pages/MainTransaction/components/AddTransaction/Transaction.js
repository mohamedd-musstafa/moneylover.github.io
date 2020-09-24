/* eslint-disable jsx-a11y/no-onchange */
import React, { memo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import "react-tabs/style/react-tabs.css";
import { addTransaction } from "../../../../actions/transactions";
import LeftArrowIcon from "../../../../assets/images/left-arrow.png";
import Category from "./Category";
// import DateForm from "./Date/index";
import "./TransactionStyle.css";

Modal.setAppElement("#root");

function Transaction({ isOpen, onRequestClose }) {
  const style = {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  };
  const [transactionType, setTransactionType] = useState(0);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [{ expense, income, amount, description }, setState] = useState({
    expense: "BILLS & UTILITIES",
    income: "SALARY",
    amount: "",
    description: "",
  });
  const [categoryText, setCategoryText] = useState("");
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    if (transactionType === 0) {
      dispatch(
        addTransaction(
          "EXPENSE",
          expense,
          Number.parseFloat(amount),
          description,
          date.toISOString()
        )
      );
    } else {
      dispatch(
        addTransaction(
          "INCOME",
          income,
          Number.parseFloat(amount),
          description,
          date.toISOString()
        )
      );
    }
    setIsCategoryOpen(false);
    onRequestClose();
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onChooseTransactionType = (category, type) => () => {
    setState((prevData) => ({
      ...prevData,
      [type]: category,
    }));
    setIsCategoryOpen(false);
    setCategoryText(category);
  };
  return (
    <>
      <Modal
        className="custom-style"
        isOpen={isOpen}
        // style={customStyles}
        onRequestClose={onRequestClose}
      >
        <div className="top-wrap">
          <span className="text">Add Transaction</span>
          <div className="btn-group">
            <button onClick={onRequestClose} className="btn">
              <span className="btn-text-cancel">CANCEL</span>
            </button>
          </div>
        </div>
        <hr className="line" />
        <form className="content-wrap" onSubmit={onSubmit}>
          <Category
            isCategoryOpen={isCategoryOpen}
            setIsCategoryOpen={setIsCategoryOpen}
            amount={amount}
            setState={setState}
            setTransactionType={setTransactionType}
            categoryText={categoryText}
            onChooseTransactionType={onChooseTransactionType}
          />
          <div className="select-options-datepicker">
            {" "}
            {/* <DateForm /> */}
            <div style={style}>
              <DatePicker
                className="btn-datepicker"
                selected={date}
                onChange={setDate}
              />
              <img
                alt="icon"
                className="left-arrow-icon2"
                src={LeftArrowIcon}
              />
              <label className="label-note">Note</label>
              <input
                className="input-description"
                name="description"
                value={description}
                onChange={onInputChange}
              />
            </div>
          </div>
          <input
            // onClick={onRequestClose}
            type="submit"
            className="input-submit"
          />
        </form>
      </Modal>
    </>
  );
}

export default memo(Transaction);
