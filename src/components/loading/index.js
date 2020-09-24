import React from "react";
import loadingicon from "../../assets/images/loading-icon.png";
import loadingbar from "../../assets/images/loading-bar.png";
import loadingprogress from "../../assets/images/loading-process.png";
import "./style.css";
loading.propTypes = {};

function loading() {
  return (
    <div className="loading-wrap">
      <img className="loading-img" alt="loading-icon" src={loadingicon}></img>
      <div className="loading-processing-bar">
        <img className="loading-bar" alt="loading-bar" src={loadingbar}></img>
        <img
          className="loading-process"
          alt="loading-process"
          src={loadingprogress}
        ></img>
      </div>
    </div>
  );
}

export default loading;
