/* eslint-disable jsx-a11y/no-onchange */
import MomentUtils from "@date-io/moment";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
// import Calendar from "react-calendar";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import "react-tabs/style/react-tabs.css";
import {
  addTransaction,
  editTransaction,
} from "../../../../actions/transactions";
import CloseIcon from "../../../../assets/images/close-icon.png";
import Category from "./Category";
import "./TransactionStyle.css";

const datePickerTheme = createMuiTheme({
  overrides: {
    MuiDialogActions: {
      root: {
        display: "none",
      },
    },
    MuiPickersSlideTransition: {
      transitionContainer: {
        marginBottom: 12,
      },
    },
  },
});

Modal.setAppElement("#root");

function Transaction({ type, transaction, isOpen, onRequestClose }) {
  const style = {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  };
  const [transactionType, setTransactionType] = useState(0);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [{ id, expense, income, amount, description }, setState] = useState({
    id: 0,
    expense: "RESTAURANT",
    income: "SALARY",
    amount: "",
    description: "",
  });
  const [categoryText, setCategoryText] = useState("");
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // document.querySelector("#date-picker-dialog-label").innerHTML = "Date";
  const onSubmit = (e) => {
    e.preventDefault();
    if (type === "edit") {
      if (transactionType === 0) {
        dispatch(
          editTransaction(
            id,
            "EXPENSE",
            expense,
            Number.parseFloat(amount),
            description,
            date.toISOString()
          )
        );
      } else {
        dispatch(
          editTransaction(
            id,
            "INCOME",
            income,
            Number.parseFloat(amount),
            description,
            date.toISOString()
          )
        );
      }
    } else if (transactionType === 0) {
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
    // console.log(setTransactionIndex);
    // setTransactionIndex(id);
  };

  useEffect(() => {
    if (type === "edit" && transaction) {
      const category = transaction.type.toLowerCase();

      setState((prevData) => ({
        ...prevData,
        id: transaction.id,
        amount: transaction.amount,
        description: transaction.description,
        [category]: transaction.category,
      }));

      setDate(moment(transaction.date).toDate());
      setCategoryText(transaction.category);
    }
  }, [transaction, type]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onChooseTransactionType = (category, typeCategory) => () => {
    setState((prevData) => ({
      ...prevData,
      [typeCategory]: category,
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
          <span className="text">
            {type === "edit" ? "Edit" : "Add"} Transaction
          </span>
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
            <div style={style}>
              <div className="datepicker-dialog">
                <ThemeProvider theme={datePickerTheme}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid>
                      <KeyboardDatePicker
                        ToolbarComponent={() => {
                          const currentDate = moment(date).format(
                            "dddd, MMMM Do YYYY"
                          );

                          return (
                            <div className="date-picker-toolbar">
                              <button
                                type="button"
                                onClick={() => setIsDatePickerOpen(false)}
                                className="date-picker-button"
                              >
                                <img src={CloseIcon} alt="Close" />
                              </button>
                              <div className="date-picker-date">
                                {currentDate}
                              </div>
                            </div>
                          );
                        }}
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date"
                        format="MM/dd/yyyy"
                        value={date}
                        onChange={setDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        open={isDatePickerOpen}
                        onOpen={() => setIsDatePickerOpen(true)}
                        onClose={() => setIsDatePickerOpen(false)}
                        autoOk
                        showTodayButton
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </div>
              <label className="label-note">Note</label>
              <input
                className="input-description"
                name="description"
                value={description}
                onChange={onInputChange}
              />
            </div>
          </div>
          <input type="submit" className="input-submit" />
        </form>
      </Modal>
    </>
  );
}

export default memo(Transaction);
