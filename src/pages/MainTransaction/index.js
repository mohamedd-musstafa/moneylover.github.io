import React, { useState } from "react";
import TabTransaction from "./components/TabTransaction";
import Topbar from "./components/Topbar";
import "./transaction.css";

export default function MainTraction() {
  const [timeShifted, setTimeShifted] = useState(0);
  return (
    <div className="homepage">
      <Topbar setTimeShifted={setTimeShifted} />
      <div className="transactions">
        <TabTransaction
          timeShifted={timeShifted}
          setTimeShifted={setTimeShifted}
        />
      </div>
    </div>
  );
}
