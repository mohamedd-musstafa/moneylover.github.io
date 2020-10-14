import React from "react";
import Modal from "react-modal";
import "./style.css";
spinner.propTypes = {};

function spinner() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}

export default spinner;
