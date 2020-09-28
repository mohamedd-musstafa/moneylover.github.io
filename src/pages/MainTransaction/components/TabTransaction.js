import createClass from "create-react-class";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTransaction } from "../../../actions/transactions";
import "../tabs.css";
import ListTransaction from "./ListTransaction";

const Tabs = createClass({
  render() {
    return (
      <div>
        <ul className="inline">
          {this.props.children.map((element, index) => {
            const style = index === this.props.tabSelected ? "selected" : "";
            return (
              <li
                className={style}
                key={index}
                onClick={this.handleChange.bind(
                  this,
                  index,
                  element.props.targetTime
                )}
              >
                {element.props.title}
              </li>
            );
          })}
        </ul>
        <hr className="line-1" />
        <div className="tab">{this.props.children[this.props.tabSelected]}</div>
      </div>
    );
  },

  handleChange(index, targetTime) {
    this.props.onTabChange(index, targetTime);
  },
});

const Panel = createClass({
  render() {
    return <div>{this.props.children}</div>;
  },
});

const selector = ({ transactions }) => transactions;

function TabTransaction({ timeShifted, setTimeShifted, setTransactionIndex }) {
  const dispatch = useDispatch();
  const transactions = useSelector(selector);
  const [tabSelected, setTabSelected] = useState(1);

  const onTabChange = (index, targetTime) => {
    setTimeShifted(timeShifted + index - 1);
  };

  useEffect(() => {
    dispatch(listTransaction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const splitTransactions = useMemo(() => {
    const lastTabMonthTransactions = [];
    const thisTabMonthTransactions = [];
    const nextTabMonthTransactions = [];

    const currentTime = moment();
    const lastTabMonthTime = currentTime
      .clone()
      .add(timeShifted, "month")
      .subtract(1, "month")
      .startOf("month");
    const thisTabMonthTime = currentTime
      .clone()
      .add(timeShifted, "month")
      .startOf("month");
    const nextTabMonthTime = currentTime
      .clone()
      .add(timeShifted, "month")
      .add(1, "month")
      .startOf("month");

    const lastTabMonthTimeText = lastTabMonthTime.format("MM-YYYY");
    const thisTabMonthTimeText = thisTabMonthTime.format("MM-YYYY");
    const nextTabMonthTimeText = nextTabMonthTime.format("MM-YYYY");

    transactions.forEach((transaction) => {
      const { date } = transaction;
      const parsedDate = moment(date);

      if (
        parsedDate.isBetween(
          lastTabMonthTime,
          lastTabMonthTime.clone().add(1, "month")
        )
      ) {
        lastTabMonthTransactions.push(transaction);
      } else if (
        parsedDate.isBetween(
          thisTabMonthTime,
          thisTabMonthTime.clone().add(1, "month")
        )
      ) {
        thisTabMonthTransactions.push(transaction);
      } else if (
        parsedDate.isBetween(
          nextTabMonthTime,
          nextTabMonthTime.clone().add(1, "month")
        )
      ) {
        nextTabMonthTransactions.push(transaction);
      }
    });

    return {
      lastTabMonthTransactions,
      thisTabMonthTransactions,
      nextTabMonthTransactions,
      lastTabMonthTime,
      thisTabMonthTime,
      nextTabMonthTime,
      lastTabMonthTimeText,
      thisTabMonthTimeText,
      nextTabMonthTimeText,
    };
  }, [timeShifted, transactions]);

  return (
    <Tabs tabSelected={tabSelected} onTabChange={onTabChange}>
      <Panel
        title={splitTransactions.lastTabMonthTimeText}
        className="day-transactions-calendars"
        targetTime={splitTransactions.lastTabMonthTime}
      >
        <ListTransaction
          transactions={splitTransactions.lastTabMonthTransactions}
          setTransactionIndex={setTransactionIndex}
        />
      </Panel>
      <Panel
        title={splitTransactions.thisTabMonthTimeText}
        className="last-month-transactions-calendars"
        targetTime={splitTransactions.thisTabMonthTime}
      >
        <ListTransaction
          transactions={splitTransactions.thisTabMonthTransactions}
          setTransactionIndex={setTransactionIndex}
        />
      </Panel>
      <Panel
        title={splitTransactions.nextTabMonthTimeText}
        className="this-month-transactions-calendars"
        targetTime={splitTransactions.nextTabMonthTime}
      >
        <ListTransaction
          transactions={splitTransactions.nextTabMonthTransactions}
          setTransactionIndex={setTransactionIndex}
        />
      </Panel>
    </Tabs>
  );
}

export default TabTransaction;
