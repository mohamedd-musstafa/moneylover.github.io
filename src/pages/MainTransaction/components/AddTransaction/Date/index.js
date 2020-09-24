import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-tabs/style/react-tabs.css";
import LeftArrowIcon from "../../../../../assets/images/left-arrow.png";
import "./index.css";
DateForm.propTypes = {};
function DateForm() {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [{ description }, setState] = useState({
    description: "",
  });
  const [date, setDate] = useState(new Date());
  const style = {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  };
  return (
    <div style={style}>
      <DatePicker
        className="btn-datepicker"
        selected={date}
        onChange={setDate}
      />

      <img alt="icon" className="left-arrow-icon2" src={LeftArrowIcon}></img>

      <label className="label-note">Note</label>
      <input
        className="input-description"
        name="description"
        value={description}
        onChange={onInputChange}
      />
    </div>
  );
}

export default DateForm;
