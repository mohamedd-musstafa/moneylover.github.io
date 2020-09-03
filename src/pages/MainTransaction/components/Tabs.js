import { default as React } from "react";
import "../txt.css";
import createClass from "create-react-class";
import ByCategoryTransaction from "../components/ByCategoryTransaction";
import ListTransaction from "./ListTransaction";
import NoTransaction from "./NoTransaction";
import ByDayTransaction from "../components/ByDayTransaction";
const Tabs = createClass({
  getInitialState() {
    return {
      selected: this.props.selected || 0,
    };
  },
  render() {
    return (
      <div>
        <ul className="inline">
          {this.props.children.map((elem, index) => {
            let style = index == this.state.selected ? "selected" : "";
            return (
              <li
                className={style}
                day-transactions-calendars
                key={index}
                onClick={this.handleChange.bind(this, index)}
              >
                {elem.props.title}
              </li>
            );
          })}
        </ul>
        <hr className="line-1"></hr>
        <div className="tab">{this.props.children[this.state.selected]}</div>
      </div>
    );
  },
  handleChange(index) {
    this.setState({ selected: index });
  },
});

const Panel = createClass({
  render() {
    return <div>{this.props.children}</div>;
  },
});

const Transactions = createClass({
  render() {
    return (
      <Tabs selected={1}>
        <Panel
          title="2020 01/06 - 30/06"
          className="day-transactions-calendars"
        >
          <NoTransaction />
        </Panel>
        <Panel title="LAST MONTH" className="last-month-transactions-calendars">
          <ListTransaction />
        </Panel>
        <Panel title="THIS MONTH" className="this-month-transactions-calendars">
          <NoTransaction />
        </Panel>
      </Tabs>
    );
  },
});
export default Transactions;
