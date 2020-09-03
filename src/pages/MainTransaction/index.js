import { default as React } from "react";
import Topbar from "../MainTransaction/components//Topbar";
import Transactions from "../MainTransaction/components/Tabs";
import "./styleTransaction.css";

export default function MainTraction() {
  // const firstName = localStorage.getItem("firstName");
  // const lastName = localStorage.getItem("lastName");
  // const id = localStorage.getItem("id");
  // const email = localStorage.getItem("email");
  // const balance = localStorage.getItem("balance");
  // const token = localStorage.getItem("token");

  return (
    <div className="homepage">
      <Topbar />
      <div className="transactions">
        <Transactions />
        {/* <div className="time-transactions">
          <span className="day-transactions-calendars">2020 01/06 - 30/06</span>
          <span className="last-month-transactions-calendars">LAST MONTH</span>
          <span className="this-month-transactions-calendars">THIS MONTH</span>
        </div> */}

        {/* <ListTransaction /> */}
        {/* <NoTransaction /> */}
      </div>
    </div>
  );
}
