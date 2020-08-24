import React from "react";
import { Component } from "react";
import "./style.css";
import depositIcon from "../../assets/images/deposit.png";
import eyeIcon from "../../assets/images/eye.png";

export default function login() {
  //   constructor(props) {
  //     super(props);
  //   }

  return (
    <div className="wrapper">
      <div className="top-background">
        <img src={depositIcon} className="deposit-icon"></img>
        <div className="header-name">Money Lover</div>
      </div>

      <div className="form-login">
        <div className="login-text">
          <p>Log In</p>
        </div>
        <form noValidate>
          <div>
            <input
              className="email"
              type="email"
              placeholder="Email"
              name="email"
              noValidate
              // onchange={handleChange}
            ></input>
          </div>
          <div>
            <input
              className="password"
              type="password"
              placeholder="Password"
              name="password"
              noValidate
              // onchange={handleChange}
            ></input>
            <img src={eyeIcon}></img>
          </div>

          <button type="submit" className="btn-login">
            <span className="btn-text">LOGIN</span>
          </button>
        </form>

        <div className="footer">
          <small>Don’t have an account?</small>
          <a className="register">Register</a>
        </div>
      </div>
    </div>
  );
}

// export default login;
